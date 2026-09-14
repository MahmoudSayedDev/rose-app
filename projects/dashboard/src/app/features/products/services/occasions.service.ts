import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import { ExternalParams } from '../../../shared/models/external-params';
import { HelperService } from '../../../shared/services/helper.service';
import { CreateOccasionRequest, DeleteOccasionResponse, OccasionsList, SingleOccasion } from '../models/occasion';

@Service()
export class OccasionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);
  private readonly _helperService = inject(HelperService);

  getOccasions(params?: ExternalParams): Observable<OccasionsList> {
    return this._httpClient.get<OccasionsList>(`${this.baseUrl}/api/occasions`, { params: this._helperService.createParams(params) })
  }

  getOccasion(id: string): Observable<SingleOccasion> {
    return this._httpClient.get<SingleOccasion>(`${this.baseUrl}/api/occasions/${id}`)
  }

  createOccasion(data: CreateOccasionRequest | Partial<CreateOccasionRequest>): Observable<SingleOccasion> {
    return this._httpClient.post<SingleOccasion>(`${this.baseUrl}/api/occasions`, data);
  }

  updateOccasion(id: string, data: Partial<CreateOccasionRequest>): Observable<SingleOccasion> {
    return this._httpClient.patch<SingleOccasion>(`${this.baseUrl}/api/occasions/${id}`, data);
  }

  deleteOccasion(id: string): Observable<DeleteOccasionResponse> {
    return this._httpClient.delete<DeleteOccasionResponse>(`${this.baseUrl}/api/occasions/${id}`);
  }
}
