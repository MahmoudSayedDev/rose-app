import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function requiredFileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value instanceof File) {
      return null;
    }

    if (Array.isArray(value) && value.length > 0) {
      return null;
    }

    return {
      required: true,
    };
  };
}

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const files: File[] = Array.isArray(value) ? value : [value];

    const invalidFile = files.find(
      (file) => file instanceof File && file.size > maxSize
    );

    if (!invalidFile) {
      return null;
    }

    return {
      maxFileSize: {
        actualSize: invalidFile.size,
        maxSize,
      },
    };
  };
}

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const files: File[] = Array.isArray(value) ? value : [value];

    const invalidFile = files.find(
      (file) => file instanceof File && !allowedTypes.includes(file.type)
    );

    if (!invalidFile) {
      return null;
    }

    return {
      fileType: {
        actualType: invalidFile.type,
        allowedTypes,
      },
    };
  };
}