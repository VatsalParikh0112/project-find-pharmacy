import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject, signal } from "@angular/core";

@Component({
  selector: "app-patient-login-dialog",
  imports: [],
  templateUrl: "./patient-login-dialog.html",
})
export class PatientLoginDialog {
  private readonly dialogRef = inject(DialogRef);

  public readonly isRegisterMode = signal(false);

  public readonly isOtpMode = signal(false);

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public toggleMode(): void {
    this.isRegisterMode.update((value: boolean) => !value);

    this.isOtpMode.set(false);
  }

  public toggleOtpMode(): void {
    this.isOtpMode.update((value: boolean) => !value);
  }
}
