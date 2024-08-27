import { Component } from '@angular/core';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';
import {MatSidenavModule} from '@angular/material/sidenav';



@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FileExplorerComponent, MatSidenavModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
