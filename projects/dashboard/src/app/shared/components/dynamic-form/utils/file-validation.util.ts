import { DynamicFieldConfig } from '../models/dynamic-field-config.interface';

export function getFileValidationError(file: File, field: DynamicFieldConfig): string | null {
  if (field.acceptedFileTypes?.length && !field.acceptedFileTypes.includes(file.type)) {
    return 'fileType';
  }

  if (field.maxFileSize !== undefined && file.size > field.maxFileSize) {
    return 'maxFileSize';
  }

  return null;
}
