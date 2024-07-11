import { bootstrapApplication,  } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { InjectionToken } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const BACKEND_URL = new InjectionToken<string>('BACKEND_URL')

bootstrapApplication(AppComponent,{providers:[
  {provide: BACKEND_URL, useValue: 'http://localhost:3000/dadjoke'},
  provideHttpClient(withFetch())
]})
