import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CloseIconSvg } from '../../icons/close-icon/close-icon';
import { UserIcon } from '../../icons/user-icon/user-icon';
import { FindPharmaLogo } from '../../Logos/find-pharma-logo/find-pharma-logo';

@Component({
  selector: 'app-common-sidebar',
  imports: [CloseIconSvg, RouterLink, RouterLinkActive, UserIcon, FindPharmaLogo],
  templateUrl: './common-sidebar.html',
})
export class CommonSidebar {
  private readonly dialogRef = inject(DialogRef);

  public closeSidebar(sidebar: HTMLElement): void {
    sidebar.classList.remove('animate-[slideIn_0.3s_ease-out]');
    sidebar.classList.add('animate-[slideOut_0.3s_ease-in]');

    setTimeout(() => {
      this.dialogRef.close();

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }, 300);
  }

  public readonly menuItems: {
    label: string;
    route: string;
  }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Us', route: 'about' },
    { label: 'Contact Us', route: 'contact' },
    { label: 'Follow Us', route: 'follow-us' },
  ];
}
