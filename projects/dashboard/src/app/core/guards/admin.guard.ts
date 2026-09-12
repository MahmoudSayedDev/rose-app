import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'auth-library';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

export const adminGuard: CanActivateFn = (route, state) => {
    const _authService = inject(AuthService);
    const _cookieService = inject(CookieService);
    const _router = inject(Router);

    if (!_authService.isAuthenticated()) {
        const authUrl = new URL('/login', environment.hostUrl)
        authUrl.searchParams.set('callbackurl', window.location.href)

        window.location.href = authUrl.toString();

        return false;
    }

    const token = _cookieService.get('user')

    if (_authService.getUserRole(token) == 'admin') {
        return true;
    }

    // Authenticated, just not allowed here — show the in-app 401 page
    // rather than bouncing out to the external login flow.
    return _router.parseUrl('/401');
};