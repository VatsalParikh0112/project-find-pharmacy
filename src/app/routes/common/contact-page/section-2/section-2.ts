import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import emailjs from "@emailjs/browser";
import { ClockIconSvg } from "../../../../shared/icons/clock-icon/clock-icon";
import { MailIconSvg } from "../../../../shared/icons/mail-icon/mail-icon";
import { PhoneIconSvg } from "../../../../shared/icons/phone-icon/phone-icon";

@Component({
  selector: "app-section-2",
  imports: [ReactiveFormsModule, ClockIconSvg, MailIconSvg, PhoneIconSvg],
  templateUrl: "./section-2.html",
})
export class Section2 {
  private readonly fb = inject(FormBuilder);

  public readonly isSubmitting = signal(false);

  public readonly isSuccess = signal(false);

  public readonly errorMessage = signal("");

  public readonly contactForm = this.fb.nonNullable.group({
    fullName: ["", [Validators.required, Validators.minLength(3)]],

    email: ["", [Validators.required, Validators.email]],

    subject: ["", [Validators.required, Validators.minLength(3)]],

    message: ["", [Validators.required, Validators.minLength(10)]],
  });

  public async sendMessage(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();

      return;
    }

    try {
      this.isSubmitting.set(true);

      this.errorMessage.set("");

      this.isSuccess.set(false);

      const { fullName, email, subject, message } = this.contactForm.getRawValue();

      await emailjs.send(
        "service_55ztn7k",
        "template_zqv5mna",
        { full_name: fullName, user_email: email, subject, message },
        "bgyapU45oJpf3qCjK",
      );

      this.isSuccess.set(true);

      this.contactForm.reset();
    } catch {
      this.errorMessage.set("Something went wrong. Please try again.");
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public get fullName() {
    return this.contactForm.controls.fullName;
  }

  public get email() {
    return this.contactForm.controls.email;
  }

  public get subject() {
    return this.contactForm.controls.subject;
  }

  public get message() {
    return this.contactForm.controls.message;
  }
}
