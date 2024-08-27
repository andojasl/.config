import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ContentViewComponent } from '../content-view/content-view.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, ContentViewComponent, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
  //styleUrl: '../../styles.css'

})
export class SideBarComponent {

}
