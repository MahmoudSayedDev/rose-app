import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from 'reusable-components';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form/dynamic-form.component';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, forkJoin } from 'rxjs';
import { LayoutService } from '../../../../core/services/layout.service';
import { DynamicFormItem } from '../../../../shared/components/dynamic-form/models/dynamic-field-group.interface';
import { UploadService } from '../../../../shared/services/upload.service';
import { Category, CreateCategoryREQ, SingleCategory } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-update-category',
  imports: [TranslatePipe, ButtonComponent, DynamicFormComponent],
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.scss',
})
export class AddUpdateCategoryComponent extends AppComponentBase implements OnInit {
  private readonly _layoutService = inject(LayoutService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _translateService = inject(TranslateService);
  private readonly _UploadService = inject(UploadService);

  fields = signal<DynamicFormItem[]>([]);

  form!: FormGroup;

  category = signal<Category | null>(null);
  categoryId = signal<string | null>(null);

  constructor() {
    super();

    effect(() => {
      const category = this.category();

      if (!category && this.categoryId()) {
        return;
      }

      this.createForm(category);
    });
  }

  ngOnInit(): void {
    this.initBreadcrumb();
    this.getCategory();
  }

  createForm(data?: Category | null) {
    this.fields.set([
      {
        name: 'title',
        type: 'text',
        label: 'categories.forms.title',
        placeholder: 'categories.forms.title_placeholder',
        defaultValue: data?.title,
        validators: {
          required: true,
        },
        errorMessages: {
          required: 'categories.forms.validation.title_required',
        },
      },
      {
        name: 'image',
        type: 'file',
        label: 'categories.forms.image',
        acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
        maxFileSize: 5 * 1024 * 1024,
        validators: {
            required: true
        },
        errorMessages: {
            required: 'categories.forms.validation.image_required'
        }
      },
    ]);
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'sidebar.nav.categories', routerLink: '/categories' },
      { label: 'categories.add_category' },
    ]);
  }

  getCategory() {
    this.categoryId.set(this._activatedRoute.snapshot.paramMap.get('id'));

    if (!this.categoryId()) {
      return;
    }

    this._categoriesService
      .getCategoryById(this.categoryId()!)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res: SingleCategory) => {
          this.category.set(res.payload.category);

          this.createForm(this.category());
        },
      });
  }

  imageSelect(img: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', img);

    return this._UploadService.upload(formData).pipe(map((res) => res.payload.url));
  }

  afterSubmited(action?: string) {
    this.formSubmited.set(false);
    this._router.navigate(['/categories']);

    if (action) {
      this._toastService.toaster(
        'success',
        this._translateService.instant(`common.messages.${action} successfully`),
      );
    }
  }

  save(data: Record<string, unknown>) {
    this.formSubmited.set(true);
    const dataToSend: CreateCategoryREQ = {
      title: data['title'] as string,
    };

    const image = data['image'];

    // Upload requests
    const uploads: {
      cover?: Observable<string>;
    } = {};

    if (image instanceof File) {
      uploads.cover = this.imageSelect(image);
    }

    if (!uploads.cover) {
      this.submitCategory(dataToSend);
      return;
    }

    forkJoin(uploads).subscribe({
      next: (res) => {
        if (res.cover) {
          dataToSend.image = res.cover;
        }

        this.submitCategory(dataToSend);
      },
      error: () => {
        this.formSubmited.set(false);
      },
    });
  }

  submitCategory(dataToSend: CreateCategoryREQ) {
    if (this.categoryId()) {
      this._categoriesService.updateCategory(this.categoryId()!, dataToSend).subscribe({
        next: () => {
          this.afterSubmited('updated');
        },
        error: () => {
          this.formSubmited.set(false);
        },
      });
      return;
    }

    this._categoriesService.createCategory(dataToSend).subscribe({
      next: () => {
        this.afterSubmited('added');
      },
      error: () => {
        this.formSubmited.set(false);
      },
    });
  }
}
