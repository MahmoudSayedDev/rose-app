import { Component, computed, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFieldConfig } from '../../models/dynamic-field-config.interface';
import { FieldErrorComponent } from 'reusable-components';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-wrapper',
  imports: [FieldErrorComponent, TranslatePipe],
  templateUrl: './form-field-wrapper.component.html',
  styleUrl: './form-field-wrapper.component.scss',
})
export class FormFieldWrapperComponent {
  readonly field = input.required<DynamicFieldConfig>();
  readonly control = input.required<FormControl>();
}
