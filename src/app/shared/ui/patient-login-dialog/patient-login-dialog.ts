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

export interface CountryCode {
  name: string;
  flag: string;
  dial: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { name: "United States", flag: "🇺🇸", dial: "+1" },
  { name: "United Kingdom", flag: "🇬🇧", dial: "+44" },
  { name: "India", flag: "🇮🇳", dial: "+91" },
  { name: "Canada", flag: "🇨🇦", dial: "+1" },
  { name: "Australia", flag: "🇦🇺", dial: "+61" },
  { name: "Germany", flag: "🇩🇪", dial: "+49" },
  { name: "France", flag: "🇫🇷", dial: "+33" },
  { name: "UAE", flag: "🇦🇪", dial: "+971" },
  { name: "Saudi Arabia", flag: "🇸🇦", dial: "+966" },
  { name: "Singapore", flag: "🇸🇬", dial: "+65" },
  { name: "Japan", flag: "🇯🇵", dial: "+81" },
  { name: "China", flag: "🇨🇳", dial: "+86" },
  { name: "South Korea", flag: "🇰🇷", dial: "+82" },
  { name: "Brazil", flag: "🇧🇷", dial: "+55" },
  { name: "Mexico", flag: "🇲🇽", dial: "+52" },
  { name: "South Africa", flag: "🇿🇦", dial: "+27" },
  { name: "Nigeria", flag: "🇳🇬", dial: "+234" },
  { name: "Pakistan", flag: "🇵🇰", dial: "+92" },
  { name: "Bangladesh", flag: "🇧🇩", dial: "+880" },
  { name: "Italy", flag: "🇮🇹", dial: "+39" },
  { name: "Spain", flag: "🇪🇸", dial: "+34" },
  { name: "Netherlands", flag: "🇳🇱", dial: "+31" },
  { name: "New Zealand", flag: "🇳🇿", dial: "+64" },
  { name: "Sweden", flag: "🇸🇪", dial: "+46" },
  { name: "Norway", flag: "🇳🇴", dial: "+47" },
];

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
  public readonly otpSent = signal(false);
  public readonly otpPhoneSent = signal(false);
  public readonly otpResending = signal(false);
  public readonly loginOtpSent = signal(false);
  public readonly loginOtpLoading = signal(false);
  public readonly loginMethod = signal<"email" | "phone">("email");
  public readonly loginCountryCode = signal<CountryCode>(COUNTRY_CODES[0]);
  public readonly selectedCountryCode = signal<CountryCode>(COUNTRY_CODES[0]);
  private otpSentToEmail = "";
  private otpSentToPhone = "";

  public readonly countryCodes = COUNTRY_CODES;

  // LOGIN FORM — email + password + loginOtp (used in OTP mode)
  public readonly loginForm = this.fb.group({
    email: ["", [Validators.email]],
    phone: ["", [Validators.pattern(/^[0-9]{4,14}$/)]],
    password: ["", [Validators.minLength(6)]],
    otp: ["", [Validators.pattern(/^\d{6}$/)]],
  });

  // REGISTER FORM
  public readonly registerForm = this.fb.group(
    {
      name: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{4,14}$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
      emailOtp: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
      phoneOtp: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
    },
    { validators: passwordMatchValidator },
  );

  public get loginEmail() {
    return this.loginForm.get("email")!;
  }
  public get loginPhone() {
    return this.loginForm.get("phone")!;
  }
  public get loginPassword() {
    return this.loginForm.get("password")!;
  }
  public get loginOtp() {
    return this.loginForm.get("otp")!;
  }
  public get loginFullPhone(): string {
    return this.loginPhone.value
      ? `${this.loginCountryCode().dial}${this.loginPhone.value}`
      : "";
  }

  public setLoginMethod(method: "email" | "phone"): void {
    this.loginMethod.set(method);
    this.loginOtpSent.set(false);
    this.loginOtp.reset();
    this.serverError.set(null);
  }

  public onLoginCountryChange(event: Event): void {
    const dial = (event.target as HTMLSelectElement).value;
    const country = this.countryCodes.find((c) => c.dial === dial) ?? COUNTRY_CODES[0];
    this.loginCountryCode.set(country);
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
  public get regEmailOtp() {
    return this.registerForm.get("emailOtp")!;
  }
  public get regPhoneOtp() {
    return this.registerForm.get("phoneOtp")!;
  }
  public get passwordMismatch(): boolean {
    return !!(this.registerForm.errors?.["passwordMismatch"] && this.regConfirmPassword.touched);
  }

  public get fullPhone(): string {
    return this.regPhone.value
      ? `${this.selectedCountryCode().dial}${this.regPhone.value}`
      : "";
  }

  public onCountryChange(event: Event): void {
    const dial = (event.target as HTMLSelectElement).value;
    const country = this.countryCodes.find((c) => c.dial === dial) ?? COUNTRY_CODES[0];
    this.selectedCountryCode.set(country);
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public toggleMode(): void {
    this.isRegisterMode.update((v) => !v);
    this.isOtpMode.set(false);
    this.otpSent.set(false);
    this.loginOtpSent.set(false);
    this.loginMethod.set("email");
    this.loginCountryCode.set(COUNTRY_CODES[0]);
    this.serverError.set(null);
    this.selectedCountryCode.set(COUNTRY_CODES[0]);
    this.otpSentToEmail = "";
    this.otpSentToPhone = "";
    this.otpPhoneSent.set(false);
    this.loginForm.reset();
    this.registerForm.reset();
  }

  public toggleOtpMode(): void {
    this.isOtpMode.update((v) => !v);
    this.loginOtpSent.set(false);
    this.loginOtp.reset();
    this.serverError.set(null);
  }

  public sendLoginOtp(): void {
    if (this.loginMethod() === "email") {
      this.loginEmail.markAsTouched();
      if (this.loginEmail.invalid || !this.loginEmail.value) return;
    } else {
      this.loginPhone.markAsTouched();
      if (this.loginPhone.invalid || !this.loginPhone.value) return;
    }

    this.loginOtpLoading.set(true);
    this.loginOtpSent.set(false);
    this.loginOtp.reset();
    this.serverError.set(null);

    const payload =
      this.loginMethod() === "email"
        ? { email: this.loginEmail.value! }
        : { phone: this.loginFullPhone };

    this.authService.sendLoginOtp(payload).subscribe({
      next: () => {
        this.loginOtpLoading.set(false);
        this.loginOtpSent.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.loginOtpLoading.set(false);
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

  public backToForm(): void {
    this.otpSent.set(false);
    this.otpPhoneSent.set(false);
    this.serverError.set(null);
    this.regEmailOtp.reset();
    this.regPhoneOtp.reset();
  }

  public onSubmit(): void {
    if (this.isLoading()) return;
    this.serverError.set(null);

    if (this.isRegisterMode()) {
      if (!this.otpSent()) {
        this.sendOtpsAndProceed();
      } else {
        this.submitRegister();
      }
    } else {
      this.submitLogin();
    }
  }

  private sendOtpsAndProceed(forceResend = false): void {
    const detailControls = ["name", "email", "phone", "password", "confirmPassword"];
    detailControls.forEach((c) => this.registerForm.get(c)?.markAsTouched());

    const detailsValid = ["name", "email", "phone", "password", "confirmPassword"].every(
      (c) => this.registerForm.get(c)?.valid,
    );

    if (!detailsValid || this.passwordMismatch) return;

    const currentEmail = this.regEmail.value!;
    const currentPhone = this.fullPhone;

    // Skip re-sending if email and phone are unchanged and OTPs were already sent
    if (!forceResend && currentEmail === this.otpSentToEmail && currentPhone === this.otpSentToPhone) {
      this.regEmailOtp.reset();
      this.otpSent.set(true);
      return;
    }

    this.isLoading.set(true);

    const payload = currentPhone
      ? { email: currentEmail, phone: currentPhone }
      : { email: currentEmail };

    this.authService.sendRegistrationOtp(payload).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.otpSentToEmail = currentEmail;
        this.otpSentToPhone = currentPhone;
        this.otpPhoneSent.set(res.phoneSent);
        this.regEmailOtp.reset();
        this.regPhoneOtp.reset();
        this.otpSent.set(true);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.serverError.set(err.error?.message ?? "Failed to send OTP. Please try again.");
      },
    });
  }

  public resendOtps(): void {
    if (this.otpResending()) return;
    this.serverError.set(null);
    this.otpResending.set(true);

    const phone = this.fullPhone;
    const payload = phone
      ? { email: this.otpSentToEmail, phone }
      : { email: this.otpSentToEmail };

    this.authService.sendRegistrationOtp(payload).subscribe({
      next: (res) => {
        this.otpResending.set(false);
        this.otpPhoneSent.set(res.phoneSent);
        this.regEmailOtp.reset();
        this.regPhoneOtp.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.otpResending.set(false);
        this.serverError.set(err.error?.message ?? "Failed to resend OTP. Please try again.");
      },
    });
  }

  private submitLogin(): void {
    if (this.isOtpMode()) {
      this.submitLoginWithOtp();
    } else {
      this.submitLoginWithPassword();
    }
  }

  private submitLoginWithPassword(): void {
    this.loginPassword.markAsTouched();
    if (this.loginMethod() === "email") {
      this.loginEmail.markAsTouched();
      if (this.loginEmail.invalid || !this.loginEmail.value) return;
    } else {
      this.loginPhone.markAsTouched();
      if (this.loginPhone.invalid || !this.loginPhone.value) return;
    }
    if (this.loginPassword.invalid || !this.loginPassword.value) return;

    this.isLoading.set(true);
    const { password } = this.loginForm.getRawValue();
    const loginPayload: LoginRequest =
      this.loginMethod() === "email"
        ? { email: this.loginEmail.value!, password: password! }
        : { phone: this.loginFullPhone, password: password! };

    this.authService.login(loginPayload).subscribe({
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

  private submitLoginWithOtp(): void {
    this.loginOtp.markAsTouched();
    if (!this.loginOtpSent()) {
      this.serverError.set(
        this.loginMethod() === "email"
          ? "Please send an OTP to your email first."
          : "Please send an OTP to your phone first.",
      );
      return;
    }
    if (this.loginOtp.invalid || !this.loginOtp.value) {
      return;
    }
    this.isLoading.set(true);

    const verifyPayload =
      this.loginMethod() === "email"
        ? { email: this.loginEmail.value!, otp: this.loginOtp.value }
        : { phone: this.loginFullPhone, otp: this.loginOtp.value };

    this.authService.verifyLoginOtp(verifyPayload).subscribe({
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

  private submitRegister(): void {
    this.regEmailOtp.markAsTouched();
    this.regPhoneOtp.markAsTouched();
    if (this.regEmailOtp.invalid || this.regPhoneOtp.invalid) return;

    this.isLoading.set(true);
    const { name, email, password, emailOtp, phoneOtp } = this.registerForm.getRawValue();

    const payload: RegisterRequest = {
      name: name!,
      email: email!,
      password: password!,
      phone: this.fullPhone,
      emailOtp: emailOtp!,
      phoneOtp: phoneOtp!,
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
}
