import { ApplicationConfig, InjectionToken, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: BACKEND_URL, useValue:'https://be-dad-jokes.vercel.app' },
    provideHttpClient(withFetch()), provideClientHydration(),
    provideExperimentalZonelessChangeDetection(), provideAnimationsAsync()
  ],
}