import { inject, InjectionToken } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldErrorMessages } from '../types/field-error.types';

export const FIELD_ERROR_MESSAGES = new InjectionToken<FieldErrorMessages>(
  'FIELD_ERROR_MESSAGES',
  {
    providedIn: 'root',
    factory: () => {
      const translate = inject(TranslateService);

      return {
        required: () =>
          translate.instant('common.validation.required'),

        requiredTrue: () =>
          translate.instant('common.validation.requiredTrue'),

        email: () =>
          translate.instant('common.validation.email'),

        minlength: (errorValue) =>
          translate.instant('common.validation.minlength', {
            requiredLength: (errorValue as { requiredLength: number }).requiredLength,
          }),

        maxlength: (errorValue) =>
          translate.instant('common.validation.maxlength', {
            requiredLength: (errorValue as { requiredLength: number }).requiredLength,
          }),

        min: (errorValue) =>
          translate.instant('common.validation.min', {
            min: (errorValue as { min: number }).min,
          }),

        max: (errorValue) =>
          translate.instant('common.validation.max', {
            max: (errorValue as { max: number }).max,
          }),

        pattern: () =>
          translate.instant('common.validation.pattern'),
      };
    },
  },
);