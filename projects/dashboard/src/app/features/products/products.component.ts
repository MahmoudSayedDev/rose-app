import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { ProductsService } from './services/products.service';
import { Product, ProductsList } from './models/product';
import { TableColumn } from '../../shared/components/table/models/column';
import { ButtonComponent, PaginatorComponent } from "reusable-components";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { ExternalParams } from '../../shared/models/external-params';
import { PaginatorState } from 'primeng/types/paginator';
import { TableAction } from '../../shared/components/table/models/table-action';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from "@angular/router";


@Component({
  selector: 'app-products',
  imports: [
    TableComponent,
    ButtonComponent,
    TranslatePipe,
    PaginatorComponent,
    ConfirmDialogModule,
    RouterLink
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ConfirmationService]
})
export class ProductsComponent extends AppComponentBase implements OnInit {

  private readonly _layoutService = inject(LayoutService);
  private readonly _productsService = inject(ProductsService);
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _translateService = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);


  cols: TableColumn[] = []
  actions: TableAction<Product>[] = []
  products = signal<Product[]>([])

  ngOnInit(): void {
    this.initBreadcrumb()
    this.getProducts()
    this.initTable()
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard' },
      { label: 'sidebar.nav.products' }
    ]);
  }

  private getParams(): ExternalParams {
    return {
      page: this.paginator().page,
      limit: this.paginator().limit
    };
  }

  getProducts() {
    this._productsService.getProducts(this.getParams()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res: ProductsList) => {
        const data = res.payload.data.map(product => ({
          ...product,
          price: Number(product.price),
          rating: `${Math.floor(Number(product.rating) * 2) / 2}/5 (${product.ratings})`
        }))

        this.products.set(data)

        this.paginator.set({
          page: res.payload.metadata.page,
          limit: res.payload.metadata.limit,
          total: res.payload.metadata.total,
          totalPages: res.payload.metadata.totalPages,
        });

        this.formSubmited.set(false)
        // console.log(this.products());
      }, error: (err) => {
        this.formSubmited.set(false)
      }
    })
  }

  onPageChange(event: PaginatorState): void {
    this.formSubmited.set(true)
    this.paginator.update(p => ({
      ...p,
      page: (event.page ?? 0) + 1,
      limit: event.rows ?? p.limit
    }));
    this.getProducts();
  }

  initTable() {
    this.cols = [
      { field: 'title', header: 'products.list.name' },
      { field: 'price', header: 'products.list.price' },
      { field: 'stock', header: 'products.list.stock' },
      { field: 'rating', header: 'products.list.rating' }
    ]

    this.actions = [
      {
        label: 'common.actions.edit',
        icon: 'pi pi-pencil',
        variant: 'text',
        severity: 'info',
        styleClass: 'bg-blue-50! dark:bg-[#38bdf810]!',
        command: (product) => this.editProduct(product)
      },
      {
        label: 'common.actions.delete',
        icon: 'pi pi-trash',
        variant: 'text',
        severity: 'danger',
        styleClass: 'bg-red-50! dark:bg-[#f8717110]!',
        command: (product) => this.deleteProduct(product)
      }
    ];
  }

  editProduct(product: Product) {
    // console.log(product.id);
    this._router.navigate(['/products/update', product.id])
  }

  deleteProduct(product: Product) {
    this._confirmationService.confirm({
      message: this._translateService.instant('common.messages.Are you sure you want to delete it?'),
      header: this._translateService.instant('common.actions.delete'),
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: this._translateService.instant('common.actions.no'),
        severity: 'secondary',
        variant: 'text'
      },
      acceptButtonProps: {
        severity: 'danger',
        label: this._translateService.instant('common.actions.yes,delete'),
      },
      accept: () => {
        // console.log(product.id);
        this._productsService.deleteProduct(product.id).subscribe({
          next: (res) => {
            // console.log(res);
            this.formSubmited.set(true)
            this.getProducts();
            this._toastService.toaster('success', this._translateService.instant('common.messages.deleted successfully'))
          }
        })
      }
    });
  }
}
