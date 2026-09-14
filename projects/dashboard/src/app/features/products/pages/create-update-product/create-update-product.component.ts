import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { LayoutService } from '../../../../core/services/layout.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputComponent, ButtonComponent } from "reusable-components";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { CategoriesService } from '../../services/categories.service';
import { OccasionsService } from '../../services/occasions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '../../models/category';
import { Occasion } from '../../models/occasion';
import { ExternalParams } from '../../../../shared/models/external-params';
import { CreateProductRequest, Product, SingleProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { UploadService } from '../../../../shared/services/upload.service';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { DynamicFormItem } from '../../../../shared/components/dynamic-form/models/dynamic-field-group.interface';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form/dynamic-form.component';


@Component({
  selector: 'app-create-update-product',
  imports: [
    TranslatePipe,
    ButtonComponent,
    DynamicFormComponent
  ],
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss',
})
export class CreateUpdateProductComponent extends AppComponentBase implements OnInit {

  private readonly _layoutService = inject(LayoutService);
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService)
  private readonly _occasionsService = inject(OccasionsService)
  private readonly _destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _translateService = inject(TranslateService);
  private readonly _UploadService = inject(UploadService);

  private getParams(): ExternalParams {
    return {
      page: this.paginator().page,
      limit: 50
    };
  }

  fields = signal<DynamicFormItem[]>([])

  form!: FormGroup

  productId = signal<string | null>('');
  product = signal<Product | null>(null);

  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);

  constructor() {
    super();

    effect(() => {
      const categories = this.categories();
      const occasions = this.occasions();
      const product = this.product();

      if (!categories.length || !occasions.length || (!product && this.productId())) {
        return;
      }

      this.createForm(product);
    });
  }

  ngOnInit(): void {
    this.initBreadcrumb()
    this.getCategories()
    this.getOccasions()
    this.getProduct()
  }

  createForm(data?: Product | null) {
    this.fields.set([
      {
        name: 'title',
        type: 'text',
        label: 'products.forms.Title',
        placeholder: 'products.forms.Enter product title',
        defaultValue: data?.title,
        validators: {
          required: true,
          minLength: 3,
        },
        errorMessages: {
          required: 'products.forms.validation.Product title is required',
        },
      },

      {
        name: 'description',
        type: 'textarea',
        label: 'products.forms.Description',
        placeholder: 'products.forms.Enter product description',
        defaultValue: data?.description,
        validators: {
          required: true,
        },
        errorMessages: {
          required:
            'products.forms.validation.Product description is required',
        },
      },

      {
        class: 'grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4',
        fields: [
          {
            name: 'price',
            type: 'number',
            label: 'products.forms.Price',
            placeholder: 'products.forms.Price Example',
            defaultValue: data?.price,
            validators: {
              required: true,
              min: 0,
            },
            errorMessages: {
              required:
                'products.forms.validation.Product price is required',
              min: 'products.forms.validation.Please enter a valid price',
            },
          },

          {
            name: 'discountValue',
            type: 'number',
            label: 'products.forms.Discount',
            placeholder: 'products.forms.Discount Example',
            defaultValue: data?.discountValue,
            validators: {
              min: 0,
            },
            errorMessages: {
              min: 'products.forms.validation.Please enter a valid discount',
            },
          },

          {
            name: 'price_after_discount',
            type: 'number',
            label: 'products.forms.Price after discount',
            placeholder: 'products.forms.after Discount Example',
            disabled: true,
          },
        ],
      },

      {
        name: 'stock',
        type: 'number',
        label: 'products.forms.Quantity',
        placeholder: 'products.forms.Quantity Example',
        defaultValue: data?.stock,
        validators: {
          required: true,
          min: 0,
        },
        errorMessages: {
          required:
            'products.forms.validation.Product quantity is required',
          min: 'products.forms.validation.Please enter a valid quantity',
        },
      },

      {
        class: 'grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4',
        fields: [
          {
            name: 'cover',
            type: 'file',
            label: 'products.forms.Product cover image',
            acceptedFileTypes: [
              'image/jpg',
              'image/jpeg',
              'image/png',
            ],
            maxFileSize: 5 * 1024 * 1024,
          },

          {
            name: 'gallery',
            type: 'file',
            label: 'products.forms.Product gallery',
            acceptedFileTypes: [
              'image/jpg',
              'image/jpeg',
              'image/png',
              'image/gif',
              'image/webp',
            ],
            maxFileSize: 5 * 1024 * 1024,
            multiple: true,
          },
        ],
      },

      {
        name: 'categoryId',
        type: 'select',
        label: 'products.forms.Category',
        placeholder: 'products.forms.Select an option',
        defaultValue: data?.categoryId,
        options: this.categories(),
        validators: {
          required: true,
        },
        errorMessages: {
          required:
            'products.forms.validation.Please select a category for the product',
        },
      },

      {
        name: 'occasionIds',
        type: 'multiselect',
        label: 'products.forms.Occasion',
        placeholder: 'products.forms.Select an option',
        defaultValue: data?.occasions.map((item) => item.occasionId),
        options: this.occasions(),
        validators: {
          required: true,
        },
        errorMessages: {
          required:
            'products.forms.validation.Please select a occasion for the product',
        },
      },
    ]);
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard', routerLink: '/' },
      { label: 'sidebar.nav.products', routerLink: '/products' },
      { label: 'products.Add Product' },
    ]);
  }

  getProduct() {
    this.productId.set(this._activatedRoute.snapshot.paramMap.get('id'))

    if (!this.productId()) {
      return
    }

    this._productsService.getProduct(this.productId()!).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res: SingleProduct) => {
        this.product.set(res.payload.product)

        this.createForm(this.product())
      }
    })
  }

  getCategories() {
    this._categoriesService.getCategories(this.getParams()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        this.categories.set(res.payload.data)
      }
    })
  }

  getOccasions() {
    this._occasionsService.getOccasions(this.getParams()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (res) => {
        this.occasions.set(res.payload.data)
      }
    })
  }

  coverSelect(img: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', img);

    return this._UploadService.upload(formData).pipe(
      map(res => res.payload.url)
    );
  }

  gallerySelect(imgs: File[]): Observable<string[]> {
    const uploadRequests = imgs.map((img) => {
      const formData = new FormData();
      formData.append('image', img);

      return this._UploadService.upload(formData).pipe(
        map(res => res.payload.url)
      );
    });

    return forkJoin(uploadRequests);
  }


  discountChange() {
    const price = this.form.get('price')?.value || 0;
    const discountValue = this.form.get('discountValue')?.value || 0;
    const discountAmount = (price * discountValue) / 100;
    const priceAfterDiscount = price - discountAmount;

    this.form.get('price_after_discount')?.setValue(priceAfterDiscount)
  }

  afterSubmited(action?: string) {
    this.formSubmited.set(false)
    this._router.navigate(['/products'])

    if (action) {
      this._toastService.toaster('success', this._translateService.instant(`common.messages.${action} successfully`))
    }
  }

  save(data: Record<string, unknown>) {
    this.formSubmited.set(true);
    const dataToSend: Partial<CreateProductRequest> = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        if (key === 'stock' || key === 'price' || key === 'discountValue') {
          dataToSend[key] = Number(value);
        } else if (key !== 'cover' && key !== 'gallery') {
          dataToSend[key as keyof CreateProductRequest] = value as never;
        }
      }
    });

    console.log(dataToSend);

    const cover = data['cover'];
    const gallery = data['gallery'];

    // Upload requests
    const uploads: {
      cover?: Observable<string>;
      gallery?: Observable<string[]>;
    } = {};

    // Cover
    if (cover instanceof File) {
      uploads.cover = this.coverSelect(cover);
    }

    // Gallery
    if (Array.isArray(gallery) && gallery.length > 0 && gallery.every((file) => file instanceof File)) {
      uploads.gallery = this.gallerySelect(gallery);
    }

    if (!uploads.cover && !uploads.gallery) {
      this.submitProduct(dataToSend);
      return;
    }

    forkJoin(uploads).subscribe({
      next: (result) => {
        if (result.cover) {
          dataToSend.cover = result.cover;
        }

        if (result.gallery) {
          dataToSend.gallery = result.gallery;
        }

        this.submitProduct(dataToSend);
      },
      error: () => {
        this.formSubmited.set(false);
      }
    });
  }


  submitProduct(dataToSend: Partial<CreateProductRequest>) {

    if (!this.productId()) {
      dataToSend.discountType = 'PERCENT'
    }

    // console.log(dataToSend);

    if (this.productId()) {
      this._productsService.updateProduct(this.productId()!, dataToSend).subscribe({
        next: () => {
          this.afterSubmited('updated');
        },
        error: () => {
          this.formSubmited.set(false);
        }
      });
      return;
    }

    this._productsService.createProduct(dataToSend).subscribe({
      next: () => {
        this.afterSubmited('added');
      },
      error: () => {
        this.formSubmited.set(false);
      }
    });
  }
}
