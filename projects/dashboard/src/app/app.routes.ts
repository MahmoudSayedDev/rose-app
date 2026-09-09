import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./features/account/account.component').then(
        (m) => m.AccountComponent
      ),
  },
  {
    path: 'account/change-password',
    loadComponent: () =>
      import(
        './features/account/change-password/change-password.component'
      ).then((m) => m.ChangePasswordComponent),
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
];
