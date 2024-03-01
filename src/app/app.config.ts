import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './helpers/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter((routes), withComponentInputBinding()), provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations()
  ]
};