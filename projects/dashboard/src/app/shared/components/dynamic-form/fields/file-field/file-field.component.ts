import { Component, OnDestroy, OnInit, signal, viewChild, } from '@angular/core';
import { FileUpload, FileSelectEvent } from 'primeng/fileupload';

import { BaseFieldComponent } from '../../base/base-field.component';
import { FormFieldWrapperComponent } from '../../components/form-field-wrapper/form-field-wrapper.component';
import { getFileValidationError } from '../../utils/file-validation.util';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-file-field',
  standalone: true,
  imports: [
    FormFieldWrapperComponent,
    FileUpload,
    TranslatePipe
  ],
  templateUrl: './file-field.component.html',
  styleUrl: './file-field.component.scss',
})
export class FileFieldComponent extends BaseFieldComponent implements OnDestroy {

  readonly selectedFiles = signal<File[]>([]);
  readonly previewUrls = signal<(string | null)[]>([]);
  readonly uploadError = signal<string | null>(null);
  readonly fileUpload = viewChild<FileUpload>('fileUpload');

  onFileSelected(event: FileSelectEvent): void {
    const files = event.files ?? [];

    if (!files.length) {
      return;
    }

    const validFiles: File[] = [];

    for (const file of files) {
      const validationError = getFileValidationError(
        file,
        this.field()
      );

      if (validationError) {
        this.uploadError.set(validationError);
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) {
      this.fileUpload()?.clear();
      return;
    }

    this.uploadError.set(null);

    const filesToSet = this.field().multiple ? validFiles : [validFiles[0]];

    this.selectedFiles.set(filesToSet);

    this.control().setValue(
      this.field().multiple ? filesToSet : filesToSet[0]
    );

    this.control().markAsTouched();
    this.control().markAsDirty();

    this.createPreviews(filesToSet);

    this.fileUpload()?.clear();
  }

  removeFile(index: number): void {
    this.selectedFiles.update((files) =>
      files.filter((_, i) => i !== index)
    );

    const files = this.selectedFiles();

    this.control().setValue(
      this.field().multiple ? files : files[0] ?? null
    );

    this.createPreviews(files)
    this.control().markAsTouched();
    this.control().markAsDirty();

    this.uploadError.set(null);
  }

  private createPreviews(files: File[]): void {
    this.clearPreviews();

    const urls = files.map((file) =>
      file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    );

    this.previewUrls.set(urls);
  }

  private clearPreviews(): void {
    this.previewUrls().forEach(url => {
      URL.revokeObjectURL(url!);
    });

    this.previewUrls.set([]);
  }

  ngOnDestroy(): void {
    this.clearPreviews();
  }
}