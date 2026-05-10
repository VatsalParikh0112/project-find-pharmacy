import { Component } from '@angular/core';
import { CommunityIcon } from '../../../../shared/icons/community-icon/community-icon';
import { ShieldIcon } from '../../../../shared/icons/shield-icon/shield-icon';
import { CheckIcon } from '../../../../shared/icons/check-icon/check-icon';
import { LocationIcon } from '../../../../shared/icons/location-icon/location-icon';

@Component({
  selector: 'app-section-3',
  imports: [CommunityIcon, ShieldIcon, CheckIcon, LocationIcon],
  templateUrl: './section-3.html',
})
export class Section3 {}
