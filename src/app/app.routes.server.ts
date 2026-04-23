import { ServerRoute, RenderMode } from '@angular/ssr';
import { commonServerRoutes } from './routes/common/common.routes.server';

export const serverRoutes: ServerRoute[] = [
  ...commonServerRoutes,

  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];