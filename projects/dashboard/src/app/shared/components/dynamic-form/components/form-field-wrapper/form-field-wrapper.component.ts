import { Component, computed, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFieldConfig } from '../../models/dynamic-field-config.interface';
import { FieldErrorComponent } from 'reusable-components';

@Component({
  selector: 'app-form-field-wrapper',
  imports: [FieldErrorComponent],
  templateUrl: './form-field-wrapper.component.html',
})
export class FormFieldWrapperComponent {
  readonly field = input.required<DynamicFieldConfig>();
  readonly control = input.required<FormControl>();

  labelClasses = computed(() =>
    this.control().touched && this.control().invalid
      ? 'text-sm font-medium text-red-600'
      : 'text-sm font-medium',
  );

  // get errorMessage(): string | null {
  //   const control = this.control();

  //   if (!control.invalid || !control.touched) {
  //     return null;
  //   }

  //   const errors = control.errors;

  //   if (!errors) {
  //     return null;
  //   }

  //   const firstError = Object.keys(errors)[0];

  //   return this.field().errorMessages?.[firstError] ?? `Invalid value`;
  // }
}
