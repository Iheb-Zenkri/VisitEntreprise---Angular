import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';
import { RestrictAuthGuard } from './core/guards/restrict-auth.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: 'authentification',
    canActivate: [RestrictAuthGuard],
    loadChildren: () => import('./pages/connectionPage/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    canActivate: [ RoleGuard,authGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./pages/adminDashboard/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'teacher',
    canActivate: [ RoleGuard,authGuard],
    data: { roles: ['TEACHER'] },
    loadChildren: () => import('./pages/teacherDashboard/teacher.routes').then(m => m.TEACHER_ROUTES)
  },
  {
    path: 'student',
    canActivate: [ RoleGuard,authGuard],
    data: { roles: ['STUDENT'] },
    loadChildren: () => import('./pages/studentDashboard/student.routes').then(m => m.STUDENT_ROUTES)
  },

  { path: '', redirectTo: '/authentification', pathMatch: 'full' },

  { path: '**', redirectTo: '/authentification' }
];
