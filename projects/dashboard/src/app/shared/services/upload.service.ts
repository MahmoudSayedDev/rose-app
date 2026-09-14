import { inject, Service } from '@angular/core';
import { UploadRes } from '../models/upload';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from 'auth-library';
import { Observable } from 'rxjs';

@Service()
export class UploadService {
    private readonly _httpClient = inject(HttpClient);
    private readonly baseUrl = inject(AUTH_API_URL);

    upload(data: FormData): Observable<UploadRes> {
        return this._httpClient.post<UploadRes>(`${this.baseUrl}/api/upload`, data);
    }
}
