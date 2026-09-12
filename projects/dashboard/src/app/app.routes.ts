import { Route } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

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
  // {
  //   path: 'test', component: TestComponent
  // },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/pages/categories/categories.component')
      .then(c => c.CategoriesComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'categories/create',
    loadComponent: () => import('./features/categories/pages/add-update-category/add-update-category.component')
      .then(c => c.AddUpdateCategoryComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'categories/update/:id',
    loadComponent: () => import('./features/categories/pages/add-update-category/add-update-category.component')
      .then(c => c.AddUpdateCategoryComponent),
    canActivate: [adminGuard]
  }
];
