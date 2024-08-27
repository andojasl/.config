import { enableProdMode } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes,provideRouter, withComponentInputBinding  } from '@angular/router';
import { CreateThemeComponent } from './app/create-theme/create-theme.component';
import { GenerateFromPicComponent } from './app/generate-from-pic/generate-from-pic.component'; 
import { GenerateThemeComponent } from './app/generate-theme/generate-theme.component'; 
import { LibraryComponent } from './app/library/library.component'; 
import { app-routing } from './app/app-routing.module';
import { SideBarComponent } from './app/side-bar/side-bar.component'; 

if (environment.production) {
  enableProdMode();
}
// const routes: Routes = [
//   { path: 'create-theme', component: CreateThemeComponent },
//   { path: 'generate-theme', component: GenerateThemeComponent },
//   { path: 'generate-from-pic', component: GenerateFromPicComponent },
//   { path: 'library', component: LibraryComponent },
//   { path: '', redirectTo: '/create-theme', pathMatch: 'full' },
//   { path: '**', redirectTo: '/create-theme' }
// ];

class AppModule { }
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync('noop'),
    provideRouter(AppRoutingModule, withComponentInputBinding())
  ]
}).catch((err) => console.error(err));