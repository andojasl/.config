import { Component, EventEmitter, Output} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ContentViewComponent } from '../content-view/content-view.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, ContentViewComponent, RouterModule, MatListModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
  //styleUrl: '../../styles.css'

})
export class SideBarComponent {
  views = ['create-theme', 'generate-theme', 'library', 'generate-from-pic',  'side-bar'];

  @Output() selectView = new EventEmitter<string>();

  // Method to emit selected view
  emitSelectView(view: string) {
    this.selectView.emit(view);
  }
}
