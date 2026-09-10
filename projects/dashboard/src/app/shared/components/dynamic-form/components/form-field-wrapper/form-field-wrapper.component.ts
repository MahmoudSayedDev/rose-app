import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFieldConfig } from '../../models/dynamic-field-config.interface';

@Component({
  selector: 'app-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
})
export class FormFieldWrapperComponent {
  readonly field = input.required<DynamicFieldConfig>();
  readonly control = input.required<FormControl>();

  get errorMessage(): string | null {
    const control = this.control();

    if (!control.invalid || !control.touched) {
      return null;
    }

    const errors = control.errors;

    if (!errors) {
      return null;
    }

    const firstError = Object.keys(errors)[0];

    return this.field().errorMessages?.[firstError] ?? `Invalid value`;
  }
}
