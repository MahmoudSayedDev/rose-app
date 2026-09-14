import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { environment } from '../../../../environments/environment';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const _toastService = inject(ToastService)
  const _router = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // Network failure (status 0) or a genuine server-side crash — send the
      // user to the global 500 page instead of a toast they can't act on.
      if (error.status === 0 || error.status >= 500) {
        _router.navigate(['/500']);
        return throwError(() => error);
      }

      if (error.error?.message?.includes('Invalid or expired token')) {
        const authUrl = new URL('/login', environment.hostUrl)
        authUrl.searchParams.set('callbackurl', window.location.href)

        window.location.href = authUrl.toString();
        return throwError(() => error);
      }

      const errorMessage = error.error?.message || 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً';

      _toastService.toaster('error', errorMessage)

      return throwError(() => error);
    })
  )
};
