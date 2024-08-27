import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ContentViewComponent } from '../content-view/content-view.component';
import { RouterModule, Router } from '@angular/router';
import { CreateThemeComponent } from '../create-theme/create-theme.component';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, ContentViewComponent, RouterModule, MatListModule, CreateThemeComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
  //styleUrl: '../../styles.css'

})
export class SideBarComponent {

}
