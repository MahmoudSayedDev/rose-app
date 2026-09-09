import { Component, computed, inject, input, model } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import type { MenuItem } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppSidebarItem } from '../models/sidebar.interface';
import { environment } from '../../../../environments/environment';
import { AuthService } from 'auth-library';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, DrawerModule, MenuModule, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly _translateService = inject(TranslateService);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly items = input<AppSidebarItem[]>([]);

  /** Two-way bound open/expanded state — controlled by the consuming layout. */
  readonly open = model(true);

  /** When true, the sidebar floats above the content (mobile) instead of pushing it. */
  readonly overlay = input(false);

  readonly previewWebsiteUrl = input('/');

  readonly userName = input('Firstname Lastname');
  readonly userEmail = input('user-email@example.com');
  readonly userAvatar = input('temp-images/profile-picture.png');

  protected readonly userMenuItems = computed<MenuItem[]>(() => {
    this._translateService.currentLang();

    return [
      {
        label: this._translateService.instant('sidebar.userMenu.profile'),
        icon: 'pi pi-user',
        command: () => this.navigateToAccount(),
      },
      {
        label: this._translateService.instant('sidebar.userMenu.logout'),
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  });

  protected handleItemClick(): void {
    if (this.overlay()) {
      this.open.set(false);
    }
  }

  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }

  logout() {
    this._authService.logout(true);
    const authUrl = new URL('/login', environment.hostUrl);
    authUrl.searchParams.set('callbackurl', window.location.href);

    window.location.href = authUrl.toString();
  }
}
