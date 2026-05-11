import { Component } from "@angular/core";
import { Section1 } from "./section-1/section-1";
import { Section2 } from "./section-2/section-2";

@Component({
  selector: "app-contact-page",
  imports: [Section1, Section2],
  templateUrl: "./contact-page.html",
})
export class ContactPage {}
