import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldWrapperComponent } from '../../components/form-field-wrapper/form-field-wrapper.component';
import { BaseFieldComponent } from '../../base/base-field.component';

@Component({
  selector: 'app-textarea-field',
  imports: [ReactiveFormsModule, FormFieldWrapperComponent],
  templateUrl: './textarea-field.component.html',
})
export class TextareaFieldComponent extends BaseFieldComponent {}
