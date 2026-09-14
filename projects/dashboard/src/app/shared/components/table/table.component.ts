import { Component, inject, OnInit, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BaseItem, TableColumn } from './models/column';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { DecimalPipe, NgClass } from '@angular/common';
import { TableAction } from './models/table-action';


@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    MenuModule,
    SkeletonModule,
    TranslatePipe,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends BaseItem> implements OnInit {

  private _translateService = inject(TranslateService)

  data = input.required<T[]>()
  cols = input.required<TableColumn[]>();
  actions = input<TableAction<T>[]>([]);
  loading = input.required<boolean>()

  ngOnInit() { }

  getMenuItems(rowData: T): MenuItem[] {
    return this.actions()
      .filter(action => !action.visible || action.visible(rowData))
      .map(action => ({
        label: this._translateService.instant(action.label),
        icon: action.icon,
        command: () => action.command(rowData)
      }));
  }
}
