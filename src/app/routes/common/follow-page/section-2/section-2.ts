import { Component } from "@angular/core";
import { LinkedinIconSvg } from "../../../../shared/icons/linkedin-icon/linkedin-icon";
import { TwitterIconSvg } from "../../../../shared/icons/twitter-icon/twitter-icon";
import { InstagramIconSvg } from "../../../../shared/icons/instagram-icon/instagram-icon";
import { FacebookFilledIconSvg } from "../../../../shared/icons/facebook-filled-icon/facebook-filled-icon";
import { GoogleIconSvg } from "../../../../shared/icons/google-icon/google-icon";

@Component({
  selector: "app-section-2",
  imports: [LinkedinIconSvg, TwitterIconSvg, InstagramIconSvg, FacebookFilledIconSvg, GoogleIconSvg],
  templateUrl: "./section-2.html",
})
export class Section2 {}
