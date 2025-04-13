import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service'; // assumes you decode and validate tokens here

export const RestrictAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);


  if (tokenService.isTokenExpired()) {
    return true;
  }

  const role = tokenService.getUserRole();

  if (role) {
    const redirectTo = `/${role.toLowerCase()}`;
    router.navigate([redirectTo]);
  } else {
    router.navigate(['/']);
  }

  return false;
};
