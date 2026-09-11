import { Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'reusable-components';
import { BaseFieldComponent } from '../../base/base-field.component';
import { InputFieldType } from '../../models/field-type';
import { FormFieldWrapperComponent } from "../../components/form-field-wrapper/form-field-wrapper.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-input-field',
  imports: [ReactiveFormsModule, InputComponent, FormFieldWrapperComponent, TranslatePipe],
  templateUrl: './dynamic-input-field.component.html',
})
export class DynamicInputFieldComponent extends BaseFieldComponent {
  readonly inputType = computed(
    () => this.field().type as InputFieldType
  );
}
