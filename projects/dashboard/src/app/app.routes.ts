import { Route } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { DashboardLayout } from './core/layout/dashboard-layout/dashboard-layout';

export const appRoutes: Route[] = [
  {
    // Unauthorized users never had access to the dashboard chrome in the
    // first place, so this renders full-screen, outside DashboardLayout.
    path: '401',
    loadComponent: () => import('./features/errors/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        loadComponent: () => import('./features/overview/overview.component').then((m) => m.OverviewComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/products.component').then((c) => c.ProductsComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'products/create',
        loadComponent: () => import('./features/products/pages/create-update-product/create-update-product.component').then((c) => c.CreateUpdateProductComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'products/update/:id',
        loadComponent: () => import('./features/products/pages/create-update-product/create-update-product.component').then((c) => c.CreateUpdateProductComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'occasions',
        loadComponent: () => import('./features/occasions/occasions.component').then((c) => c.OccasionsComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'occasions/create',
        loadComponent: () => import('./features/occasions/pages/create-update-occasion/create-update-occasion.component').then((c) => c.CreateUpdateOccasionComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'occasions/update/:id',
        loadComponent: () => import('./features/occasions/pages/create-update-occasion/create-update-occasion.component').then((c) => c.CreateUpdateOccasionComponent),
        canActivate: [adminGuard]
      },
      {
        path: '500',
        loadComponent: () => import('./features/errors/server-error/server-error.component').then((m) => m.ServerErrorComponent),
      },
      {
        // Catch-all: keep last. Renders inside the dashboard chrome, matching
        // the 404 design (breadcrumb + sidebar still visible).
        path: '**',
        loadComponent: () => import('./features/errors/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
