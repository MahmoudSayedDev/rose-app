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

@Component({
  selector: 'app-create-update-product',
  imports: [
    TranslatePipe,
    InputComponent,
    TextareaModule,
    SelectModule,
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
  product = signal<Product | CreateProductRequest | null>(null);

  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);

  ngOnInit(): void {
    this.initBreadcrumb()
    this.createForm()
    this.getProduct()
    this.getCategories()
    this.getOccasions()
  }

  createForm(data?: CreateProductRequest) {
    console.log(data);

    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      price: [data?.price || '', [Validators.required, Validators.min(1)]],
      discountValue: [data?.discountValue || '', [Validators.min(1)]],
      price_after_discount: [{ value: '', disabled: true }],
      stock: [data?.stock ?? '', [Validators.required, Validators.min(0)]],
      cover: [data?.cover || '', [Validators.required]],
      gallery: [data?.gallery || [], [Validators.required]],
      categoryId: [data?.categoryId || '', [Validators.required]],
      occasionId: [data?.occasionId || '', [Validators.required]],
    })
  }

  initBreadcrumb() {
    this._layoutService.setToolbarItems([
      { label: 'sidebar.nav.dashboard' },
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

        this.createForm(this.product() as CreateProductRequest)
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
      console.log('Cover:', file);
    }
  }

  onGallerySelect(event: any) {
    const files = event.files;
    console.log('Gallery:', files);
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
      this._toastService.toaster('success', this._translateService.instant(`common.messages.${action} successfully`) )
    }
  }

  save() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.value as CreateProductRequest

    const dataToSend = {
      title: formValues.title,
      description: formValues.description,
      price: formValues.price,
      discountValue: formValues.discountValue,
      stock: formValues.stock,
      cover: formValues.cover,
      gallery: formValues.gallery,
      categoryId: formValues.categoryId,
      occasionId: formValues.occasionId,
    } as CreateProductRequest

    
    this._productsService.createProduct(dataToSend).subscribe({
      next: () => {
        this.afterSubmited('added')
      }, error: () => {
        this.afterSubmited()
      }
    })
  }
}
