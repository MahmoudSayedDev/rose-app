import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { ExternalParams } from '../../../shared/models/external-params';
import { HelperService } from '../../../shared/services/helper.service';
import { CategoriesList } from '../models/category';

@Service()
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);
  private readonly _helperService = inject(HelperService);

  getCategories(params?: ExternalParams): Observable<CategoriesList> {
    return this._httpClient.get<CategoriesList>(`${this.baseUrl}/api/categories`, { params: this._helperService.createParams(params) })
  }
}
