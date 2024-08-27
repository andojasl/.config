import { Component } from '@angular/core';
import { FileExplorerComponent } from '../file-explorer/file-explorer.component';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FileExplorerComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
