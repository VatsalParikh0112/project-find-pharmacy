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

  public readonly isRegisterMode = signal(false);
  public readonly isOtpMode = signal(false);
  public readonly isLoading = signal(false);
  public readonly serverError = signal<string | null>(null);
  public readonly isPasswordVisible = signal(false);
  public readonly isConfirmPasswordVisible = signal(false);

  public readonly loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

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

  public get loginEmail() {
    return this.loginForm.get("email")!;
  }
  public get loginPassword() {
    return this.loginForm.get("password")!;
  }
  public get regName() {
    return this.registerForm.get("name")!;
  }
  public get regEmail() {
    return this.registerForm.get("email")!;
  }
  public get regPhone() {
    return this.registerForm.get("phone")!;
  }
  public get regPassword() {
    return this.registerForm.get("password")!;
  }
  public get regConfirmPassword() {
    return this.registerForm.get("confirmPassword")!;
  }
  public get passwordMismatch(): boolean {
    return !!(this.registerForm.errors?.["passwordMismatch"] && this.regConfirmPassword.touched);
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public toggleMode(): void {
    this.isRegisterMode.update((v) => !v);
    this.isOtpMode.set(false);
    this.serverError.set(null);
    this.loginForm.reset();
    this.registerForm.reset();
  }

  public toggleOtpMode(): void {
    this.isOtpMode.update((v) => !v);
    this.serverError.set(null);
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible.update((v) => !v);
  }

  public toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible.update((v) => !v);
  }

  public onSubmit(): void {
    if (this.isLoading()) return;
    this.serverError.set(null);

    if (this.isRegisterMode()) {
      this.submitRegister();
    } else {
      this.submitLogin();
    }
  }

  private submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const payload = this.loginForm.getRawValue() as LoginRequest;

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

  private submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const { name, email, phone, password } = this.registerForm.getRawValue();
    const payload: RegisterRequest = {
      name: name!,
      email: email!,
      password: password!,
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
        this.serverError.set(firstApiError ?? err.error?.message ?? "Registration failed. Please try again.");
      },
    });
  }
}
