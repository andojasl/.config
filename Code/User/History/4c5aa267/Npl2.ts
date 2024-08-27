// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CreateThemeComponent } from './create-theme/create-theme.component';
import { GenerateThemeComponent } from './generate-theme/generate-theme.component';
import { GenerateFromPicComponent } from './generate-from-pic/generate-from-pic.component';
import { generate } from 'rxjs';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  { path: '', redirectTo: '/side-bar', pathMatch: 'full' },
  { path: 'side-bar', component: SideBarComponent },
  { path: 'create-theme', component: CreateThemeComponent },
  { path: 'generate-from-pic', component: GenerateFromPicComponent },
  { path: 'generate-theme', component: GenerateThemeComponent },
  { path: 'library', component: LibraryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
