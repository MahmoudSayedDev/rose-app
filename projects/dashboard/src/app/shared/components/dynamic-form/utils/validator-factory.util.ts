import { ValidatorFn, Validators } from '@angular/forms';

import { DynamicFieldConfig } from '../models/dynamic-field-config.interface';
import { fileSizeValidator, fileTypeValidator } from '../validators/file.validators';

export function createValidators(field: DynamicFieldConfig): ValidatorFn[] {
  const config = field.validators;

  const validators: ValidatorFn[] = [];

  if (config?.required) {
    validators.push(Validators.required);
  }

  if (config?.email) {
    validators.push(Validators.email);
  }

  if (config?.minLength !== undefined) {
    validators.push(Validators.minLength(config.minLength));
  }

  if (config?.maxLength !== undefined) {
    validators.push(Validators.maxLength(config.maxLength));
  }

  if (config?.min !== undefined) {
    validators.push(Validators.min(config.min));
  }

  if (config?.max !== undefined) {
    validators.push(Validators.max(config.max));
  }

  if (config?.pattern !== undefined) {
    validators.push(Validators.pattern(config.pattern));
  }

  if (config?.custom?.length) {
    validators.push(...config.custom);
  }

  // File validators
  if (field.type === 'file') {
    if (field.maxFileSize !== undefined) {
      validators.push(fileSizeValidator(field.maxFileSize));
    }

    if (field.acceptedFileTypes?.length) {
      validators.push(fileTypeValidator(field.acceptedFileTypes));
    }
  }

  return validators;
}
