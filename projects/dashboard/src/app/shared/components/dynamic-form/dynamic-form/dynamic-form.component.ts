import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldConfig } from '../models/dynamic-field-config.interface';
import { DynamicFieldHostComponent } from '../fields/dynamic-field-host/dynamic-field-host.component';
import { createValidators } from '../utils/validator-factory.util';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, DynamicFieldHostComponent],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  readonly fields = input.required<DynamicFieldConfig[]>();
  readonly submitLabel = input('Submit');

  readonly submitted = output<Record<string, unknown>>();

  form = new FormGroup({});

  constructor() {
    effect(() => {
      this.buildForm(this.fields());
    });
  }

  private buildForm(fields: DynamicFieldConfig[]): void {
    const controls: Record<string, FormControl> = {};

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

  getControl(field: DynamicFieldConfig): FormControl {
    return this.form.get(field.name) as FormControl;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }
}
