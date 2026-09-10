import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;

    if (!file) {
      return null;
    }

    return file.size > maxSize
      ? {
          maxFileSize: {
            actualSize: file.size,
            maxSize,
          },
        }
      : null;
  };
}

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;

    if (!file) {
      return null;
    }

    const isAllowed = allowedTypes.includes(file.type);

    return isAllowed
      ? null
      : {
          fileType: {
            actualType: file.type,
            allowedTypes,
          },
        };
  };
}
