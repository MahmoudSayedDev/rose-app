import {
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  Input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, icons } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-input',
  imports: [InputTextModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  private injector = inject(Injector);

  @Input() label = '';
  @Input() placeholder = '';
  @Input() inputId!: string;
  @Input() styleClass = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() valid: boolean = false;
  @Input() customErrorMessages: Record<string, string> = {};

  @Input() set disabled(value: boolean) {
    this.isDisabled.set(value);
  }
  @Input() isReadonly: boolean = false;

  required = input<boolean>(false)
  min = input<number | null>(null);
  max = input<number | null>(null);

  showErrors = input<boolean>(true);

  icons = icons;
  value = signal('');
  isDisabled = signal(false);
  isPasswordVisible = signal(false);

  onInput = output<void>();

  ngControl: NgControl | null = null;

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get resolvedType(): string {
    if (this.type !== 'password') return this.type;
    return this.isPasswordVisible() ? 'text' : 'password';
  }

  // get errorMessage(): string | null {
  //   const ctrl = this.ngControl?.control;
  //   if (!ctrl || !ctrl.invalid || !ctrl.touched) return null;

  //   if (ctrl.errors?.['required']) return 'This field is required';
  //   if (ctrl.errors?.['email']) return 'Please enter a valid email.';
  //   if (ctrl.errors?.['minlength']) {
  //     return `Minimum ${ctrl.errors['minlength'].requiredLength} characters.`;
  //   }

  //   const firstKey = Object.keys(ctrl.errors ?? {})[0];
  //   return firstKey ?? 'Invalid value.';
  // }

  get errorMessage(): string | null {
    const ctrl = this.ngControl?.control;
    if (!ctrl || !ctrl.invalid || !ctrl.touched) return null;

    const firstErrorKey = Object.keys(ctrl.errors ?? {})[0];
    if (!firstErrorKey) return null;

    // 2. لو الأب باعت Translation Key مخصص للخطأ ده، نرجعه فوراً
    if (this.customErrorMessages && this.customErrorMessages[firstErrorKey]) {
      return this.customErrorMessages[firstErrorKey];
    }

    // 3. لو مفيش رسالة مخصصة، نرجع Translation Keys الافتراضية
    if (firstErrorKey === 'required') return 'common.validation.required';
    if (firstErrorKey === 'email') return 'common.validation.email';
    if (firstErrorKey === 'minlength') return 'common.validation.minlength';

    // 4. Fallback لأي خطأ غير متوقع
    return `common.validation.${firstErrorKey}`;
  }

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(val: string | null): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  handleInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue);
    this.onChange(newValue);
    this.onInput.emit();
  }

  onBlur(): void {
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible.update((v) => !v);
  }
}
