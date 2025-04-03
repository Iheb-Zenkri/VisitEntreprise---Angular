import { Routes } from '@angular/router';
import { RestrictAuthGuard } from '../../core/guards/restrict-auth.guard';
import { authGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  { path: 'choix-connexion', loadComponent: () => import('./pre-login/pre-login.component').then(m => m.PreLoginComponent)},
  { path: 'connexion', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent), canActivate: [authGuard] },
  { path: 'inscription', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),canActivate: [authGuard] }
];
