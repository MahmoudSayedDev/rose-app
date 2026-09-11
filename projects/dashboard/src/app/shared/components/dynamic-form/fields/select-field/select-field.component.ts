import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base/base-field.component';
import { FormFieldWrapperComponent } from '../../components/form-field-wrapper/form-field-wrapper.component';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-field',
  imports: [ReactiveFormsModule, FormFieldWrapperComponent, SelectModule],
  templateUrl: './select-field.component.html',
})
export class SelectFieldComponent extends BaseFieldComponent {}
