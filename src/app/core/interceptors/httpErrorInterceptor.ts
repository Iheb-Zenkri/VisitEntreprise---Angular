import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const snackBar = inject(MatSnackBar);
  
  return next(req).pipe(
    tap((response: any) => {
      if (response.ok && response.body.message) {
        snackBar.open(response.body.message, 'D\'accord', {
          duration: Infinity,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'custom-snackbar-success',
        });
      }
    }),

    catchError((error: HttpErrorResponse) => {
      if(error.status != 0){
        snackBar.open(error.error.message, 'D\'accord', {
          duration: Infinity,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'custom-snackbar-error' 
        });
      }
      return throwError(() => error);
    })
  );
};
