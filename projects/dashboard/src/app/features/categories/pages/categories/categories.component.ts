import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent, PaginatorComponent } from 'reusable-components';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn } from '../../../../shared/components/table/models/column';
import { TableAction } from '../../../../shared/components/table/models/table-action';
import { LayoutService } from '../../../../core/services/layout.service';
import { CategoriesService } from '../../services/categories.service';
import { ExternalParams } from '../../../../shared/models/external-params';
import { PaginatorState } from 'primeng/types/paginator';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesList, Category } from '../../models/category';
import { finalize } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  imports: [
    ButtonComponent,
    RouterLink,
    TranslatePipe,
    TableComponent,
    PaginatorComponent,
    ConfirmDialog,
  ],
  providers: [ConfirmationService],
})
export class CategoriesComponent extends AppComponentBase implements OnInit {
  private readonly _layoutService = inject(LayoutService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _translateService = inject(TranslateService);

  cols: TableColumn[] = [];
  actions: TableAction<Category>[] = [];
  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.initBreadcrumb();
    this.getCategories();
    this.initTable();
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'sidebar.nav.categories' },
    ]);
  }

  private getParams(): ExternalParams {
    return {
      page: this.paginator().page,
      limit: this.paginator().limit,
    };
  }

  getCategories(): void {
    this._categoriesService
      .getCategories(this.getParams())
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.formSubmited.set(false)),
      )
      .subscribe({
        next: (res: CategoriesList) => {
          this.categories.set(res.payload.data);

          this.paginator.set({
            page: res.payload.metadata.page,
            limit: res.payload.metadata.limit,
            total: res.payload.metadata.total,
            totalPages: res.payload.metadata.totalPages,
          });
        },
      });
  }

  onPageChange(event: PaginatorState): void {
    this.formSubmited.set(true);
    this.paginator.update((p) => ({
      ...p,
      page: (event.page ?? 0) + 1,
      limit: event.rows ?? p.limit,
    }));
    this.getCategories();
  }

  initTable() {
    this.cols = [
      { field: 'title', header: 'categories.list.name' },
      { field: 'products', header: 'categories.list.products' },
    ];

    this.actions = [
      {
        label: 'common.actions.edit',
        icon: 'pi pi-pencil',
        variant: 'text',
        severity: 'info',
        styleClass: 'bg-blue-50! dark:bg-[#38bdf810]!',
        command: (category) => this.editCategory(category.id),
      },
      {
        label: 'common.actions.delete',
        icon: 'pi pi-trash',
        variant: 'text',
        severity: 'danger',
        styleClass: 'bg-red-50! dark:bg-[#f8717110]!',
        command: (category) => this.deleteCategory(category.id),
      },
    ];
  }

  editCategory(categoryId: string) {
    console.log(categoryId);
    
    this._router.navigate(['/categories/update', categoryId]);
  }

  deleteCategory(categoryId: string) {
     this._confirmationService.confirm({
       message: this._translateService.instant(
         'common.messages.question',
       ),
       header: this._translateService.instant('common.actions.delete'),
       icon: 'pi pi-exclamation-triangle',
       rejectButtonProps: {
         label: this._translateService.instant('common.actions.no'),
         severity: 'secondary',
         variant: 'text',
       },
       acceptButtonProps: {
         severity: 'danger',
         label: this._translateService.instant('common.actions.yes,delete'),
       },
       accept: () => {
         this._categoriesService.deleteCategory(categoryId).subscribe({
           next: () => {
             this.formSubmited.set(true);
             this.getCategories();
             this._toastService.toaster(
               'success',
               this._translateService.instant('common.messages.deleted successfully'),
             );
           },
         });
       },
     });
  }
}
