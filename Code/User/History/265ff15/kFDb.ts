import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ContentViewComponent } from '../content-view/content-view.component';
import { RouterModule, Router } from '@angular/router';
import { CreateThemeComponent } from '../create-theme/create-theme.component';
import { GenerateFromPicComponent } from '../generate-from-pic/generate-from-pic.component';
import { GenerateThemeComponent } from '../generate-theme/generate-theme.component';
import { LibraryComponent } from '../library/library.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, ContentViewComponent, RouterModule, MatListModule, CreateThemeComponent, GenerateFromPicComponent, GenerateThemeComponent, LibraryComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
  //styleUrl: '../../styles.css'

})
export class SideBarComponent {
  constructor(private router: Router) {}

  navigate(event: Event, path: string) {
    event.preventDefault();
    const vscode = (window as any).acquireVsCodeApi();
    vscode.postMessage({ command: 'navigate', path });
    this.router.navigate([path]); //
  }
}
