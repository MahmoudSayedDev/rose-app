import { FieldErrorMessages } from 'reusable-components';
import { FieldType } from './field-type';
import { FieldValidators } from './field-validators.interface';

export interface DynamicFieldConfig<TOption = unknown> {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: unknown;
  disabled?: boolean;
  readonly?: boolean;
  validators?: FieldValidators;
  errorMessages?: FieldErrorMessages;
  options?: TOption[];
  dataKey?: string,
  optionLabel?: string,
  optionValue?: string,
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean
}
