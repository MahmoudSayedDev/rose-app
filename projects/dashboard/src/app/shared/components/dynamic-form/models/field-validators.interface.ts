import { ValidatorFn } from '@angular/forms';

export interface FieldValidators {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string | RegExp;
  custom?: ValidatorFn[];
}
