import { Component, inject } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FindPharmaLogo } from "../../Logos/find-pharma-logo/find-pharma-logo";
import { CommonSidebar } from "../common-sidebar/common-sidebar";
import { MenuIconSvg } from "../../icons/menu-icon/menu-icon";
import { UserIconSvg } from "../../icons/user-icon/user-icon";
import { PatientLoginDialog } from "../../ui/patient-login-dialog/patient-login-dialog";

@Component({
  selector: "app-common-topbar",
  imports: [FindPharmaLogo, MenuIconSvg, UserIconSvg, RouterLink, RouterLinkActive],
  templateUrl: "./common-topbar.html",
})
export class CommonTopbar {
  private readonly dialog = inject(Dialog);

  public openSidebar(): void {
    this.dialog.open(CommonSidebar, {
      hasBackdrop: true,
    });
  }

  public openPatientLoginDialog(): void {
    this.dialog.open(PatientLoginDialog, {
      panelClass: "custom-auth-dialog",
    });
  }

  public scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  public readonly menuItems: {
    label: string;
    route: string;
  }[] = [
    { label: "Home", route: "home" },
    { label: "About Us", route: "about" },
    { label: "Contact Us", route: "contact" },
    { label: "Follow Us", route: "follow-us" },
  ];
}
