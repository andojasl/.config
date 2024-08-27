import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CreateThemeComponent } from './create-theme/create-theme.component';
import { GenerateFromPicComponent } from './generate-from-pic/generate-from-pic.component';
import { GenerateThemeComponent } from './generate-theme/generate-theme.component';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
declare function acquireVsCodeApi(): {
  postMessage(options: { command: string; data: unknown }): void;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    SideBarComponent, CreateThemeComponent, LibraryComponent, GenerateThemeComponent, GenerateFromPicComponent],
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedView: string = 'side-bar'; // Default view

  // Method to update selected view
  onSelectView(view: string) {
    this.selectedView = view;
  }
  title = 'dahu';
  vscode = acquireVsCodeApi();

  constructor() {
    window.addEventListener(
      'message',
      (
        event: MessageEvent<{ command: string; payload: { title: string } }>,
      ) => {
        if (event.data.command === 'update-title') {
          this.title = event.data.payload.title;
        }
      },
    );
  }

  postToExtension(text: string) {
    this.vscode.postMessage({
      command: 'notification',
      data: {
        text,
      },
    });
  }
}
