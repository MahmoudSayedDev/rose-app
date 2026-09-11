import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFieldConfig } from '../models/dynamic-field-config.interface';

@Directive()
export abstract class BaseFieldComponent {
  readonly field = input.required<DynamicFieldConfig>();
  readonly control = input.required<FormControl>();
}
