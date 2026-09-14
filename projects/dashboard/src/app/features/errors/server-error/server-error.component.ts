import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-server-error',
  imports: [TranslatePipe],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerErrorComponent {
  private readonly _layoutService = inject(LayoutService);

  constructor() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'errors.500.breadcrumb' },
    ]);
  }
}
