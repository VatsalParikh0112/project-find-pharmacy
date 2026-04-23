import { Routes } from '@angular/router';
import { Common } from './common';
import { HomePage } from './home-page/home-page';
import { AboutPage } from './about-page/about-page';
import { ContactPage } from './contact-page/contact-page';
import { FollowPage } from './follow-page/follow-page';

export const commonRoutes: Routes = [
  {
    path: '',
    component: Common,
    children: [
      { path: 'home', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'contact', component: ContactPage },
      { path: 'follow-us', component: FollowPage },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
