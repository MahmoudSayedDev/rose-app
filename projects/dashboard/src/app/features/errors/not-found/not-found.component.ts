import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  private readonly _layoutService = inject(LayoutService);

  constructor() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'errors.404.breadcrumb' },
    ]);
  }
}
