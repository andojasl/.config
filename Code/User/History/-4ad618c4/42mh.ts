// main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideRouter, Routes } from '@angular/router';
import { CreateThemeComponent } from './app/create-theme/create-theme.component';
import { GenerateFromPicComponent } from './app/generate-from-pic/generate-from-pic.component'; 
import { GenerateThemeComponent } from './app/generate-theme/generate-theme.component'; 
import { LibraryComponent } from './app/library/library.component'; 

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  { path: 'create-theme', component: CreateThemeComponent },
  { path: 'generate-theme', component: GenerateThemeComponent },
  { path: 'generate-from-pic', component: GenerateFromPicComponent },
  { path: 'library', component: LibraryComponent },
  { path: '', redirectTo: '/create-theme', pathMatch: 'full' },
  { path: '**', redirectTo: '/create-theme' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
