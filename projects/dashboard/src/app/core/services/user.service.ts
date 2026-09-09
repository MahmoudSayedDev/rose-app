import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AUTH_API_URL } from 'auth-library';
import {
  ChangePasswordRequest,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserProfile,
} from '../models/user.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_URL);

  getProfile(): Observable<UserProfile> {
    return this.http
      .get<GetProfileResponse>(`${this.baseUrl}/api/users/profile`)
      .pipe(map((res) => res.payload.user));
  }

  updateProfile(body: UpdateProfileRequest): Observable<UserProfile> {
    return this.http
      .patch<UpdateProfileResponse>(`${this.baseUrl}/api/users/profile`, body)
      .pipe(map((res) => res.payload.user));
  }

  changePassword(body: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/api/users/change-password`,
      body
    );
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/users/account`);
  }
}
