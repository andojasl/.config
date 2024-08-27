import { Component, EventEmitter, Output, HostListener} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ContentViewComponent } from '../content-view/content-view.component';
import { RouterModule, Router } from '@angular/router';
import { CreateThemeComponent } from '../create-theme/create-theme.component';
import { GenerateFromPicComponent } from '../generate-from-pic/generate-from-pic.component';
import { GenerateThemeComponent } from '../generate-theme/generate-theme.component';
import { LibraryComponent } from '../library/library.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatSidenavModule, ContentViewComponent, RouterModule, MatListModule, CommonModule, GenerateThemeComponent, GenerateFromPicComponent, LibraryComponent, CreateThemeComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
  //styleUrl: '../../styles.css'

})
export class SideBarComponent {
  views = ['create-theme', 'generate-theme', 'library', 'generate-from-pic',  'side-bar'];
  selectedView: string = 'side-bar';

  @Output() selectView = new EventEmitter<string>();

  @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   const view = target.getAttribute('data-view');
  //   selectedView: string = 'side-bar';

  //   if (view && this.views.includes(view)) {
  //     this.emitSelectView(view);
  //   }
  // }

  // Method to emit selected view
  emitSelectView(view: string) {
    this.selectedView = view;
    this.selectView.emit(view);
    console.log(this.selectedView); 
  }
}
