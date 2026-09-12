import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { OccasionsService } from '../products/services/occasions.service';
import { Occasion, OccasionsList } from '../products/models/occasion';
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
  selector: 'app-occasions',
  imports: [
    TableComponent,
    ButtonComponent,
    TranslatePipe,
    PaginatorComponent,
    ConfirmDialogModule,
    RouterLink
],
  templateUrl: './occasions.component.html',
  styleUrl: './occasions.component.scss',
  providers: [ConfirmationService]
})
export class OccasionsComponent extends AppComponentBase implements OnInit {

  private readonly _layoutService = inject(LayoutService);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _translateService = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);


  cols: TableColumn[] = []
  actions: TableAction<Occasion>[] = []
  occasions = signal<Occasion[]>([])

  ngOnInit(): void {
    this.initBreadcrumb()
    this.getOccasions()
    this.initTable()
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'sidebar.nav.occasions' }
    ]);
  }

  private getParams(): ExternalParams {
    return {
      page: this.paginator().page,
      limit: this.paginator().limit
    };
  }

  getOccasions() {
    this._occasionsService.getOccasions(this.getParams()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res: OccasionsList) => {
        this.occasions.set(res.payload.data)

        this.paginator.set({
          page: res.payload.metadata.page,
          limit: res.payload.metadata.limit,
          total: res.payload.metadata.total,
          totalPages: res.payload.metadata.totalPages,
        });

        this.formSubmited.set(false)
      }, error: () => {
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
    this.getOccasions();
  }

  initTable() {
    this.cols = [
      { field: 'title', header: 'occasions.list.name' },
      { field: 'description', header: 'occasions.list.description' }
    ]

    this.actions = [
      {
        label: 'common.actions.edit',
        icon: 'pi pi-pencil',
        variant: 'text',
        severity: 'info',
        styleClass: 'bg-blue-50! dark:bg-[#38bdf810]!',
        command: (occasion) => this.editOccasion(occasion)
      },
      {
        label: 'common.actions.delete',
        icon: 'pi pi-trash',
        variant: 'text',
        severity: 'danger',
        styleClass: 'bg-red-50! dark:bg-[#f8717110]!',
        command: (occasion) => this.deleteOccasion(occasion)
      }
    ];
  }

  editOccasion(occasion: Occasion) {
    this._router.navigate(['/occasions/update', occasion.id])
  }

  deleteOccasion(occasion: Occasion) {
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
        this._occasionsService.deleteOccasion(occasion.id).subscribe({
          next: () => {
            this.formSubmited.set(true)
            this.getOccasions();
            this._toastService.toaster('success', this._translateService.instant('common.messages.deleted successfully'))
          }
        })
      }
    });
  }
}
