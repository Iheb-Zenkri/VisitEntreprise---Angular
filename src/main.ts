import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { errorInterceptor } from './app/core/interceptors/httpErrorInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from './app/core/interceptors/loadingInterceptor';
import { authInterceptor } from './app/core/interceptors/authInterceptor';


bootstrapApplication(AppComponent,{
  providers: [
    provideRouter(routes),
    provideHttpClient(
        withInterceptors([
        errorInterceptor,
        loadingInterceptor,
        authInterceptor,
      ])
    ), 
    provideAnimationsAsync()
  ]
})
  .catch((err) => console.error(err));
