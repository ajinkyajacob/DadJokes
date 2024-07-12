import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { InjectionToken, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {} from '@ngx-env/core';

export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL');
bootstrapApplication(AppComponent, {
  providers: [
    { provide: BACKEND_URL, useValue: import.meta.env.NG_APP_API_URL },
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection()
  ],
});
