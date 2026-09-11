import { DynamicFieldConfig } from './dynamic-field-config.interface';

export interface DynamicFieldGroup<T = unknown> {
  fields: DynamicFieldConfig<T>[];
  class?: string;
}

export type DynamicFormItem<T = unknown> = | DynamicFieldConfig<T> | DynamicFieldGroup<T>;