import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const userRole = tokenService.getUserRole();
  const allowedRoles = route.data?.['roles'] as string[];

  if (allowedRoles.includes(userRole)) {
    return true;
  }

  const fallbackUrl = `/${userRole.toLowerCase()}`;
  router.navigateByUrl(fallbackUrl);
  return false;
};
