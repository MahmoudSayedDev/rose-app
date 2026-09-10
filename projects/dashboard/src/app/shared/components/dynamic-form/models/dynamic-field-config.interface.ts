import { FieldType } from './field-type';
import { SelectOption } from './select-option.interface';
import { FieldValidators } from './field-validators.interface';

export interface DynamicFieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: unknown;
  disabled?: boolean;
  readonly?: boolean;
  validators?: FieldValidators;
  errorMessages?: Record<string, string>;
  options?: SelectOption[];
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}
