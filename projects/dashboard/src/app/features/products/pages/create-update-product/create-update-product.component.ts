import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { LayoutService } from '../../../../core/services/layout.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputComponent, ButtonComponent } from "reusable-components";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
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


@Component({
  selector: 'app-create-update-product',
  imports: [
    TranslatePipe,
    InputComponent,
    TextareaModule,
    SelectModule,
    MultiSelectModule,
    ButtonComponent,
    FileUploadModule,
    ReactiveFormsModule
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


  private getParams(): ExternalParams {
    return {
      page: this.paginator().page,
      limit: 50
    };
  }

  form!: FormGroup

  productId = signal<string | null>('');
  product = signal<Product | null>(null);

  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);

  ngOnInit(): void {
    this.initBreadcrumb()
    this.createForm()
    this.getProduct()
    this.getCategories()
    this.getOccasions()
  }

  createForm(data?: Product | null) {
    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      price: [data?.price || '', [Validators.required, Validators.min(1)]],
      discountType: ['PERCENT'],
      discountValue: [data?.discountValue || '', [Validators.min(1)]],
      price_after_discount: [{ value: '', disabled: true }],
      stock: [data?.stock ?? '', [Validators.required, Validators.min(0)]],
      cover: [''],
      gallery: [[]],
      categoryId: [data?.categoryId || '', [Validators.required]],
      occasionIds: [data?.occasions.map((occasion) => occasion.occasionId) || [], [Validators.required]],
    })
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

  onCoverSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.form.get('cover')?.markAsDirty()
      this.form.get('cover')?.setValue(file)
    }
  }

  onGallerySelect(event: any) {
    const files = event.files;
    // console.log('Gallery:', files);
    this.form.get('gallery')?.markAsDirty()
    this.form.get('gallery')?.setValue(files)
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

  save() {
    this.formSubmited.set(true)
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.formSubmited.set(false)
      return;
    }

    const dataToSend: Partial<CreateProductRequest> = {};

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);

      if (control?.dirty) {
        if (key == 'price' || key == 'stock') {
          dataToSend[key] = Number(control.value);
        } else {
          dataToSend[key as keyof CreateProductRequest] = control.value;
        }
      }
    });
    dataToSend.discountType = this.form.get('discountType')?.value



    if (this.productId()) {
      this._productsService.updateProduct(this.productId()!, dataToSend).subscribe({
        next: () => {
          this.afterSubmited('updated')
        }, error: () => {
          this.formSubmited.set(false)
        }
      })
      return
    }

    this._productsService.createProduct(dataToSend).subscribe({
      next: () => {
        this.afterSubmited('added')
      }, error: () => {
        this.formSubmited.set(false)
      }
    })
  }
}
