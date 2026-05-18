import { DialogRef } from "@angular/cdk/dialog";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";

import { AuthService } from "../../../core/services/auth.service";
import { LoginRequest, RegisterRequest } from "../../../core/models/auth.models";

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: "app-patient-login-dialog",
  imports: [ReactiveFormsModule],
  templateUrl: "./patient-login-dialog.html",
})
export class PatientLoginDialog {
  private readonly dialogRef = inject(DialogRef);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  // MODE SIGNALS
  public readonly isRegisterMode = signal(false);
  public readonly isOtpMode = signal(false);
  public readonly isVerifyStep = signal(false);

  // LOADING SIGNALS
  public readonly isLoading = signal(false);
  public readonly isOtpSending = signal(false);

  // STATE SIGNALS
  public readonly serverError = signal<string | null>(null);
  public readonly isPasswordVisible = signal(false);
  public readonly isConfirmPasswordVisible = signal(false);

  // LOGIN FORM — email + password + loginOtp (used in OTP mode)
  public readonly loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    loginOtp: [""],
  });

  // REGISTER FORM
  public readonly registerForm = this.fb.group(
    {
      name: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern(/^[0-9]{10}$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  // VERIFY STEP FORM (OTP inputs shown after "Create Account" is clicked)
  public readonly verifyForm = this.fb.group({
    emailOtp: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  // GETTERS — login
  public get loginEmail() { return this.loginForm.get("email")!; }
  public get loginPassword() { return this.loginForm.get("password")!; }
  public get loginOtp() { return this.loginForm.get("loginOtp")!; }

  // GETTERS — register
  public get regName() { return this.registerForm.get("name")!; }
  public get regEmail() { return this.registerForm.get("email")!; }
  public get regPhone() { return this.registerForm.get("phone")!; }
  public get regPassword() { return this.registerForm.get("password")!; }
  public get regConfirmPassword() { return this.registerForm.get("confirmPassword")!; }
  public get passwordMismatch(): boolean {
    return !!(this.registerForm.errors?.["passwordMismatch"] && this.regConfirmPassword.touched);
  }

  // GETTERS — verify
  public get emailOtpCtrl() { return this.verifyForm.get("emailOtp")!; }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public toggleMode(): void {
    this.isRegisterMode.update((v) => !v);
    this.isOtpMode.set(false);
    this.isVerifyStep.set(false);
    this.serverError.set(null);
    this.loginForm.reset();
    this.registerForm.reset();
    this.verifyForm.reset();
  }

  // Called when user clicks "Login with OTP" — validates email then sends OTP
  public toggleOtpMode(): void {
    if (this.isOtpMode()) {
      this.isOtpMode.set(false);
      this.loginOtp.reset();
      this.serverError.set(null);
      return;
    }

    if (this.loginEmail.invalid) {
      this.loginEmail.markAsTouched();
      this.serverError.set("Please enter a valid email first");
      return;
    }

    this.serverError.set(null);
    this.isOtpSending.set(true);

    this.authService.sendOtp(this.loginEmail.value!).subscribe({
      next: () => {
        this.isOtpSending.set(false);
        this.isOtpMode.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.isOtpSending.set(false);
        this.serverError.set(err.error?.message ?? "Failed to send OTP. Please try again.");
      },
    });
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible.update((v) => !v);
  }

  public toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible.update((v) => !v);
  }

  // Called from login form submit
  public onSubmit(): void {
    if (this.isLoading()) return;
    this.serverError.set(null);

    if (this.isOtpMode()) {
      this.submitVerifyOtp();
    } else {
      this.submitLogin();
    }
  }

  // Called from register form submit — sends OTPs then shows verify step
  public onRegisterSubmit(): void {
    if (this.isLoading()) return;
    this.serverError.set(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, phone } = this.registerForm.getRawValue();
    this.isLoading.set(true);

    this.authService.sendRegistrationOtp({ email: email!, ...(phone ? { phone } : {}) }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isVerifyStep.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.serverError.set(err.error?.message ?? "Failed to send OTPs. Please try again.");
      },
    });
  }

  // Called from verify step submit — verifies OTPs and creates account
  public onCompleteRegister(): void {
    if (this.isLoading()) return;
    this.serverError.set(null);

    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { name, email, phone, password } = this.registerForm.getRawValue();
    const { emailOtp } = this.verifyForm.getRawValue();

    const payload: RegisterRequest = {
      name: name!,
      email: email!,
      password: password!,
      emailOtp: emailOtp!,
      ...(phone ? { phone } : {}),
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close({ success: true });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        const firstApiError = (err.error?.errors as { msg: string }[] | undefined)?.[0]?.msg;
        this.serverError.set(
          firstApiError ?? err.error?.message ?? "Registration failed. Please try again.",
        );
      },
    });
  }

  public goBackToRegisterForm(): void {
    this.isVerifyStep.set(false);
    this.verifyForm.reset();
    this.serverError.set(null);
  }

  private submitLogin(): void {
    if (this.loginEmail.invalid || this.loginPassword.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    const payload = {
      email: this.loginEmail.value!,
      password: this.loginPassword.value!,
    } as LoginRequest;

    this.authService.login(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close({ success: true });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.serverError.set(err.error?.message ?? "Login failed. Please try again.");
      },
    });
  }

  private submitVerifyOtp(): void {
    const otp = this.loginOtp.value;
    if (!otp || !/^\d{6}$/.test(otp)) {
      this.loginOtp.markAsTouched();
      this.serverError.set("Please enter a valid 6-digit OTP");
      return;
    }
    this.isLoading.set(true);

    this.authService.verifyOtp({ email: this.loginEmail.value!, otp }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close({ success: true });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.serverError.set(err.error?.message ?? "OTP verification failed. Please try again.");
      },
    });
  }
}
