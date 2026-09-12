import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedComponent {}
