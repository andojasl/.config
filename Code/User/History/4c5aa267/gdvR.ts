import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateThemeComponent } from './create-theme/create-theme.component';
import { GenerateThemeComponent } from './generate-theme/generate-theme.component';
import { GenerateFromPicComponent } from './generate-from-pic/generate-from-pic.component';
import { LibraryComponent } from './library/library.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  { path: 'create-theme', component: CreateThemeComponent },
  { path: 'generate-theme', component: GenerateThemeComponent },
  { path: 'generate-from-pic', component: GenerateFromPicComponent },
  { path: 'library', component: LibraryComponent },
  { path: '', redirectTo: 'library', pathMatch: 'full' },
  { path: '**', redirectTo: 'library' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
