import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const routes: Routes = [
    { path: '', redirectTo: '/choix-connexion', pathMatch: 'full' },
    ...AUTH_ROUTES,
    { path: '**', redirectTo: '/choix-connexion' }];
