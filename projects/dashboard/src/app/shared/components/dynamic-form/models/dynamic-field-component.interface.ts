import { FormControl } from '@angular/forms';
import { DynamicFieldConfig } from './dynamic-field-config.interface';

export interface DynamicFieldComponent {
  field: DynamicFieldConfig;
  control: FormControl;
}
