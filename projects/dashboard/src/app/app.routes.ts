import { Route } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { TestComponent } from './features/testDynamicForm/test.component';

export const appRoutes: Route[] = [
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
    path: 'test', component: TestComponent
  }
];
