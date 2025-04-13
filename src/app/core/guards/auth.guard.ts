import { TokenService } from './../services/token.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  
  const tokenService = inject(TokenService)

  if (typeof window !== 'undefined' && window.localStorage) {
    const userTypeSelected = tokenService.getUserRole() || localStorage.getItem('userType');

    if (userTypeSelected) {
      return true;
    } else {
      router.navigate(['/choix-connexion']);
      return false;
    }
  } else {
    router.navigate(['/choix-connexion']);
    return false;
  }
};
