import { Component } from '@angular/core';
import { Section2 } from './section-2/section-2';
import { Section1 } from './section-1/section-1';
import { Section3 } from './section-3/section-3';

@Component({
  selector: 'app-home-page',
  imports: [Section2, Section1, Section3],
  templateUrl: './home-page.html',
})
export class HomePage {}
