import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonTopbar } from '../../shared/layout/common-topbar/common-topbar';
import { CommonFooter } from '../../shared/layout/common-footer/common-footer';

@Component({
  selector: 'app-common',
  imports: [RouterOutlet, CommonTopbar, CommonFooter],
  templateUrl: './common.html',
})
export class Common {}
