import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { catchError, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);
  
  // Show loading indicator when a request starts
  loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      // Hide loading indicator when the request is completed (success or error)
      loadingService.setLoading(false);
    }),
    catchError((error) => {
      // Handle error appropriately, if needed
      loadingService.setLoading(false);  // Hide loading on error
      throw error;
    })
  );
};
