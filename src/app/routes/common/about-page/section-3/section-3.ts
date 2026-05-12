import { Component } from "@angular/core";
import { CommunityIconSvg } from "../../../../shared/icons/community-icon/community-icon";
import { ShieldIconSvg } from "../../../../shared/icons/shield-icon/shield-icon";
import { CheckIconSvg } from "../../../../shared/icons/check-icon/check-icon";
import { LocationIconSvg } from "../../../../shared/icons/location-icon/location-icon";

@Component({
  selector: "app-section-3",
  imports: [CommunityIconSvg, ShieldIconSvg, CheckIconSvg, LocationIconSvg],
  templateUrl: "./section-3.html",
})
export class Section3 {}
