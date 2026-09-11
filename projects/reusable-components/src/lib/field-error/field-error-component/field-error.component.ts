import { Component, computed, inject, input } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { FIELD_ERROR_MESSAGES } from '../token/field-error-messages.token';
import { FieldErrorMessages } from '../types/field-error.types';
import { TranslatePipe } from '@ngx-translate/core';

let nextId = 0;

@Component({
  selector: 'lib-field-error',
  imports: [TranslatePipe],
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.scss',
  host: {
    class: 'field-error',
  },
})
export class FieldErrorComponent {
  private readonly defaultMessages = inject(FIELD_ERROR_MESSAGES);

  readonly control = input<AbstractControl | NgControl | null>(null);
  readonly label = input<string>('');
  readonly customMessages = input<FieldErrorMessages>({});
  readonly priority = input<string[]>([]);
  readonly forceShow = input<boolean>(false);
  readonly id = input<string>(`field-error-${++nextId}`);

  private readonly resolvedControl = computed<AbstractControl | null>(() => {
    const c = this.control();
    if (!c) return null;
    return c instanceof NgControl ? c.control : c;
  });

  private readonly controlTick = toSignal(
    toObservable(this.resolvedControl).pipe(switchMap((ctrl) => (ctrl ? ctrl.events : of(null)))),
    { initialValue: null },
  );

  protected readonly message = computed<string | null>(() => {
    this.controlTick();

    const control = this.resolvedControl();
    const errors = control?.errors;
    if (!control || !errors) return null;

    const visible = this.forceShow() || control.touched || control.dirty;
    if (!visible) return null;

    const errorKey = this.pickErrorKey(Object.keys(errors));
    if (!errorKey) return null;

    const messages = { ...this.defaultMessages, ...this.customMessages() };
    const resolver = messages[errorKey];
    if (!resolver) {
      return 'This field is invalid.';
    }

    return typeof resolver === 'function' ? resolver(errors[errorKey], this.label()) : resolver;
  });

  protected readonly hasError = computed(() => this.message() !== null);

  private pickErrorKey(activeKeys: string[]): string | null {
    if (activeKeys.length === 0) return null;
    const ordered = this.priority();
    const prioritized = ordered.find((key) => activeKeys.includes(key));
    return prioritized ?? activeKeys[0];
  }
}
