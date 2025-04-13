import {  Routes } from "@angular/router";


export const TEACHER_ROUTES : Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard',loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)}, 
    { path: '**', redirectTo: 'dashboard' }
]