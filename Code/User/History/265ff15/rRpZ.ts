import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
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
  imports: [MatSidenavModule, ContentViewComponent, RouterModule, MatListModule, CreateThemeComponent, GenerateFromPicComponent, GenerateThemeComponent, LibraryComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
  //styleUrl: '../../styles.css'

})
export class SideBarComponent {
  activeComponent: string = 'create-theme';
  activateComponent(component: string) {
    console.log('Activated component:', component);
    this.activeComponent = component;
  }
}
