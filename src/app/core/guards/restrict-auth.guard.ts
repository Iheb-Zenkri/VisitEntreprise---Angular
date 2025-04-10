import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const RestrictAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('auth_token');

  if (!isLoggedIn) {
    console.log('User is not logged in, access granted');
    return true;
  } else {
    console.log('User is logged in, access denied, redirecting...');

    router.navigate(['/'], { queryParams: { returnUrl: state.url } });

    return false;
  }
};
