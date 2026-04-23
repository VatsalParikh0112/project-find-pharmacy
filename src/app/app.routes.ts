import { Routes } from '@angular/router';
import { commonRoutes } from './routes/common/common.routes';

export const routes: Routes = [
  {
    path: '',
    children: commonRoutes,
  },
];
