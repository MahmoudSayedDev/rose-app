import { Service } from '@angular/core';
import { ExternalParams } from '../models/external-params';
import { HttpParams } from '@angular/common/http';

@Service()
export class HelperService {

    createParams(params?: ExternalParams): HttpParams {
        let httpParams = new HttpParams();

        if (!params) return httpParams;

        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                httpParams = httpParams.set(key, value);
            }
        });

        return httpParams;
    }
}
