import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { CreateProductRequest, DeleteProductResponse, Product, ProductsList, SingleProduct } from '../models/product';
import { ExternalParams } from '../../../shared/models/external-params';
import { ProductCardBadge } from 'reusable-components';
import { HelperService } from '../../../shared/services/helper.service';

@Service()
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);
  private readonly _helperService = inject(HelperService);

  getProducts(params?: ExternalParams): Observable<ProductsList> {
    return this._httpClient.get<ProductsList>(`${this.baseUrl}/api/products`, { params: this._helperService.createParams(params) })
  }

  getProduct(id: string): Observable<SingleProduct> {
    return this._httpClient.get<SingleProduct>(`${this.baseUrl}/api/products/${id}`)
  }

  createProduct(data: CreateProductRequest): Observable<SingleProduct> {
    return this._httpClient.post<SingleProduct>(`${this.baseUrl}/api/products`, data);
  }

  updateProduct(id: string, data: CreateProductRequest): Observable<SingleProduct> {
    return this._httpClient.patch<SingleProduct>(`${this.baseUrl}/api/products/${id}`, data);
  }

  deleteProduct(id: string): Observable<DeleteProductResponse> {
    return this._httpClient.delete<DeleteProductResponse>(`${this.baseUrl}/api/products/${id}`);
  }
}
