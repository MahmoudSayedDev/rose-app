import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardLayout } from "./core/layout/dashboard-layout/dashboard-layout";
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastModule } from 'primeng/toast';

@Component({
  imports: [
    RouterModule, 
    DashboardLayout,
    ToastModule
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'dashboard';

  private readonly _translateService = inject(TranslateService)
  private readonly _cookieService = inject(CookieService);

  constructor() {
    this._translateService.addLangs(['ar', 'en']);
    this._translateService.setFallbackLang(this._cookieService.get('lang') || 'en');
    this._translateService.use(this._cookieService.get('lang') || 'en');

    const root = document.documentElement
    root.setAttribute('lang', this._translateService.getCurrentLang()!)
    root.setAttribute('dir', this._translateService.getCurrentLang() == 'ar' ? 'rtl' : 'ltr')
  }
}
