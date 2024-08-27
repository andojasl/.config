
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from "./side-bar/side-bar.component";
import { GenerateThemeComponent } from "./generate-theme/generate-theme.component";
import { LibraryComponent } from "./library/library.component";
import { CreateThemeComponent } from "./create-theme/create-theme.component";
import { GenerateFromPicComponent } from "./generate-from-pic/generate-from-pic.component";

const routes: Routes = [
  { path: '', redirectTo: '/side-bar',component:SideBarComponent, pathMatch: 'full' },
  { path: 'library', component: LibraryComponent },
  { path: 'create-theme', component: CreateThemeComponent },
  { path: 'generate-theme', component: GenerateThemeComponent },
  { path: 'generate-from-pic', component: GenerateFromPicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
