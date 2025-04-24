import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuthRequest = req.url.includes('/api/auth/');

  if (isAuthRequest) {
    return next(req);
    }

  if (tokenService.isTokenExpired()) {
    tokenService.clearToken();
    router.navigateByUrl('/connexion');
    throw new Error('Token expired');
  }

  const token = tokenService.getToken();
  const isApiRequest = req.url.includes('/api/');
  const authReq = token && isApiRequest
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};
