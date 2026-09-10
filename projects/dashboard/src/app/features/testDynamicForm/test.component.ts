import { Component } from '@angular/core';
import { DynamicFieldConfig } from '../../shared/components/dynamic-form/models/dynamic-field-config.interface';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-example',
  imports: [DynamicFormComponent],
  templateUrl: './test.component.html',
})
export class TestComponent {
  readonly fields: DynamicFieldConfig[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      validators: {
        required: true,
        minLength: 3,
      },
    },

    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      validators: {
        required: true,
        email: true,
      },
    },

    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      validators: {
        required: true,
        minLength: 8,
      },
    },

    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      placeholder: 'Tell us about yourself',
      validators: {
        maxLength: 200,
      },
    },

    {
      name: 'role',
      type: 'select',
      label: 'Role',
      placeholder: 'Select your role',
      options: [
        {
          label: 'Frontend Developer',
          value: 'frontend',
        },
        {
          label: 'Backend Developer',
          value: 'backend',
        },
        {
          label: 'UI/UX Designer',
          value: 'designer',
        },
      ],
      validators: {
        required: true,
      },
    },

    {
      name: 'profileImage',
      type: 'file',
      label: 'Profile Image',
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
      maxFileSize: 2 * 1024 * 1024,
      validators: {
        required: true,
      },
    },
  ];

  onSubmit(data: Record<string, unknown>): void {
    console.log('Form submitted:', data);
  }
}
