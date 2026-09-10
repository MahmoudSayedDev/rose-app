import { Component, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { BaseFieldComponent } from '../../base/base-field.component';
import { FormFieldWrapperComponent } from '../../components/form-field-wrapper/form-field-wrapper.component';
import { getFileValidationError } from '../../utils/file-validation.util';

@Component({
  selector: 'app-file-field',
  standalone: true,
  imports: [FormFieldWrapperComponent],
  templateUrl: './file-field.component.html',
  styleUrl: './file-field.component.scss',
})
export class FileFieldComponent extends BaseFieldComponent implements OnDestroy {
  readonly selectedFile = signal<File | null>(null);
  readonly previewUrl = signal<string | null>(null);
  readonly uploadError = signal<string | null>(null);

  readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  private objectUrl: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const validationError = getFileValidationError(file, this.field());

    if (validationError) {
      this.uploadError.set(validationError);
      this.resetFileInput();
      return;
    }

    this.uploadError.set(null);

    this.control().setValue(file);
    this.control().markAsTouched();

    this.setFile(file);
  }

  removeFile(): void {
    this.selectedFile.set(null);

    this.control().setValue(null);
    this.control().markAsTouched();

    this.uploadError.set(null);

    this.resetFileInput();
    this.clearPreview();
  }

  private setFile(file: File): void {
    this.selectedFile.set(file);
    this.createPreview(file);
  }

  private createPreview(file: File): void {
    this.clearPreview();

    if (!file.type.startsWith('image/')) {
      return;
    }

    this.objectUrl = URL.createObjectURL(file);

    this.previewUrl.set(this.objectUrl);
  }

  private clearPreview(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }

    this.previewUrl.set(null);
  }

  private resetFileInput(): void {
    const input = this.fileInput()?.nativeElement;

    if (input) {
      input.value = '';
    }
  }

  ngOnDestroy(): void {
    this.clearPreview();
  }
}
