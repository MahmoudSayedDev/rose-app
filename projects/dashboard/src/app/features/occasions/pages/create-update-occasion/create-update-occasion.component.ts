import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { LayoutService } from '../../../../core/services/layout.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputComponent, ButtonComponent } from "reusable-components";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { OccasionsService } from '../../../products/services/occasions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateOccasionRequest, Occasion, SingleOccasion } from '../../../products/models/occasion';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-update-occasion',
  imports: [
    TranslatePipe,
    InputComponent,
    TextareaModule,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-update-occasion.component.html',
  styleUrl: './create-update-occasion.component.scss',
})
export class CreateUpdateOccasionComponent extends AppComponentBase implements OnInit {

  private readonly _layoutService = inject(LayoutService);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _translateService = inject(TranslateService);

  form!: FormGroup

  occasionId = signal<string | null>('');
  occasion = signal<Occasion | null>(null);

  ngOnInit(): void {
    this.initBreadcrumb()
    this.createForm()
    this.getOccasion()
  }

  createForm(data?: Occasion | null) {
    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
    })
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'sidebar.nav.occasions', routerLink: '/occasions' },
      { label: 'occasions.Add Occasion' },
    ]);
  }

  getOccasion() {
    this.occasionId.set(this._activatedRoute.snapshot.paramMap.get('id'))

    if (!this.occasionId()) {
      return
    }

    this._occasionsService.getOccasion(this.occasionId()!).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res: SingleOccasion) => {
        this.occasion.set(res.payload.occasion)

        this.createForm(this.occasion())
      }
    })
  }

  afterSubmited(action?: string) {
    this.formSubmited.set(false)
    this._router.navigate(['/occasions'])

    if (action) {
      this._toastService.toaster('success', this._translateService.instant(`common.messages.${action} successfully`))
    }
  }

  save() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.formSubmited.set(false)
      return;
    }

    const dataToSend = {} as Partial<CreateOccasionRequest>

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);

      if (control?.dirty && control.value !== null) {
        dataToSend[key as keyof CreateOccasionRequest] = control.value
      }
    });

    if (this.occasionId()) {
      this._occasionsService.updateOccasion(this.occasionId()!, dataToSend).subscribe({
        next: () => {
          this.afterSubmited('updated')
        }, error: () => {
          this.formSubmited.set(false)
        }
      })
      return
    }

    this._occasionsService.createOccasion(dataToSend).subscribe({
      next: () => {
        this.afterSubmited('added')
      }, error: () => {
        this.formSubmited.set(false)
      }
    })
  }
}
