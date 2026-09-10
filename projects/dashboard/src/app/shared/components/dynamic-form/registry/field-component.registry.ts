import { Type } from '@angular/core';
import { TextareaFieldComponent } from '../fields/textarea-field/textarea-field.component';
import { SelectFieldComponent } from '../fields/select-field/select-field.component';
import { FieldType } from '../models/field-type';
import { DynamicInputFieldComponent } from '../fields/dynamic-input-field/dynamic-input-field.component';
import { FileFieldComponent } from '../fields/file-field/file-field.component';

export const FIELD_COMPONENT_REGISTRY: Partial<Record<FieldType, Type<unknown>>> = {
  text: DynamicInputFieldComponent,
  email: DynamicInputFieldComponent,
  number: DynamicInputFieldComponent,
  password: DynamicInputFieldComponent,

  textarea: TextareaFieldComponent,
  select: SelectFieldComponent,
  file: FileFieldComponent,
};
