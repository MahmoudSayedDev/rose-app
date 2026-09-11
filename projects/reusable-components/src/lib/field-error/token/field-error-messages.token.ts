import { inject, InjectionToken } from '@angular/core';
import { FieldErrorMessages } from '../types/field-error.types';
import { TranslateService } from '@ngx-translate/core';

export const FIELD_ERROR_MESSAGES = new InjectionToken<FieldErrorMessages>('FIELD_ERROR_MESSAGES', {
  providedIn: 'root',
  factory: () => {
    const translate = inject(TranslateService);

    return {
      required: (_e, label) =>
        translate.instant('common.validation.required', { field: label || 'This field' }),
      requiredTrue: (_e, label) =>
        translate.instant('common.validation.requiredTrue', { field: label || 'this' }),
      email: (_e, label) =>
        translate.instant('common.validation.email', { field: label || 'email' }),
      minlength: (e, label) =>
        translate.instant('common.validation.minlength', {
          field: label || 'This field',
          requiredLength: e.requiredLength,
          actualLength: e.actualLength,
        }),
      maxlength: (e, label) =>
        translate.instant('common.validation.maxlength', {
          field: label || 'This field',
          requiredLength: e.requiredLength,
          actualLength: e.actualLength,
        }),
      min: (e, label) =>
        translate.instant('common.validation.min', {
          field: label || 'this field',
          requiredLength: e.min,
        }),
      max: (e, label) =>
        translate.instant('common.validation.max', {
          field: label || 'this field',
          requiredLength: e.max,
        }),
      pattern: (_e, label) =>
        translate.instant('common.validation.pattern', { field: label || 'this field' }),
    };
  },
});
