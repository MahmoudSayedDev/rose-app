import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AUTH_API_URL } from 'auth-library';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { FIELD_ERROR_MESSAGES, FieldErrorMessages } from 'reusable-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
    provideRouter(appRoutes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
    CookieService,
    MessageService,
    {
      provide: AUTH_API_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: FIELD_ERROR_MESSAGES,
      useFactory: (): FieldErrorMessages => {
        const translate = inject(TranslateService);

        return {
          required: (_e, label) =>
            translate.instant('validation.required', { field: label || 'This field' }),
          email: (_e, label) =>
            translate.instant('validation.email', { field: label || 'email' }),
          minlength: (e, label) =>
            translate.instant('validation.minlength', {
              field: label || 'This field',
              requiredLength: e.requiredLength,
              actualLength: e.actualLength,
            }),
          maxlength: (e, label) =>
            translate.instant('validation.maxlength', {
              field: label || 'This field',
              requiredLength: e.requiredLength,
              actualLength: e.actualLength,
            }),
          min: (e, label) =>
            translate.instant('validation.min', {
              field: label || 'this field',
              requiredLength: e.min,
            }),
          max: (e, label) =>
            translate.instant('validation.max', {
              field: label || 'this field',
              requiredLength: e.max,
            }),
          pattern: (_e, label) =>
            translate.instant('validation.pattern', { field: label || 'this field' }),
        };
      },
    },
  ],
};
