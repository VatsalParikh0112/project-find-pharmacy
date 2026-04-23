import { Component } from '@angular/core';
import { WhiteFindPharmaLogo } from '../../Logos/white-find-pharma-logo/white-find-pharma-logo';
import { WhatsappIconSvg } from '../../icons/whatsapp-icon/whatsapp-icon';
import { MailIconSvg } from '../../icons/mail-icon/mail-icon';
import { RouterLink } from '@angular/router';
import { FacebookFilledIconSvg } from '../../icons/facebook-filled-icon/facebook-filled-icon';
import { LinkedinIconSvg } from '../../icons/linkedin-icon/linkedin-icon';
import { InstagramIconSvg } from '../../icons/instagram-icon/instagram-icon';
import { TwitterIconSvg } from '../../icons/twitter-icon/twitter-icon';

@Component({
  selector: 'app-common-footer',
  imports: [
    WhiteFindPharmaLogo,
    WhatsappIconSvg,
    MailIconSvg,
    RouterLink,
    FacebookFilledIconSvg,
    LinkedinIconSvg,
    InstagramIconSvg,
    TwitterIconSvg,
  ],
  templateUrl: './common-footer.html',
})
export class CommonFooter {}
