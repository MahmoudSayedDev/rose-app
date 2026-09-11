import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldConfig } from '../models/dynamic-field-config.interface';
import { DynamicFieldHostComponent } from '../fields/dynamic-field-host/dynamic-field-host.component';
import { createValidators } from '../utils/validator-factory.util';
import { DynamicFieldGroup, DynamicFormItem } from '../models/dynamic-field-group.interface';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, DynamicFieldHostComponent],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  readonly fields = input.required<DynamicFormItem[]>();
  readonly submitted = output<Record<string, unknown>>();

  form = new FormGroup({});

  constructor() {
    effect(() => {
      this.buildForm(this.fields());
    });
  }

  private buildForm(items: DynamicFormItem[]): void {
    const controls: Record<string, FormControl> = {};
    const fields = this.getAllFields(items);

    for (const field of fields) {
      if (controls[field.name]) {
        throw new Error(`Duplicate field name: ${field.name}`);
      }

      controls[field.name] = new FormControl(
        {
          value: field.defaultValue ?? null,
          disabled: field.disabled ?? false,
        },
        {
          validators: createValidators(field),
        },
      );
    }

    this.form = new FormGroup(controls);
  }

  private getAllFields(items: DynamicFormItem[],): DynamicFieldConfig[] {
    return items.flatMap((item) =>
      this.isGroup(item)
        ? this.getAllFields(item.fields)
        : [item],
    );
  }

  getControl(field: DynamicFieldConfig): FormControl {
    return this.form.get(field.name) as FormControl;
  }

  isGroup(item: DynamicFormItem): item is DynamicFieldGroup {
    return 'fields' in item;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }
}
