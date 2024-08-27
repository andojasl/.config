import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { VsCodeApiService } from 'src/vsCodeAPIService';
import { Preset } from 'ext-src/dataObjects';

@Component({
  selector: 'app-edit-workbench',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-workbench.component.html',
  styleUrls:[ './edit-workbench.component.css']
})
export class EditWorkbenchComponent {
  // private vscode = (window as any).acquireVsCodeApi();
  private vscode: any;

  colors: { name: string; hex: string }[] = [];
  // colors = [
  //   { name: 'Color 1', hex: '#FF0000' },
  //   { name: 'Color 2', hex: '#00FF00' },
  //   { name: 'Color 3', hex: '#0000FF' },
  //   { name: 'Color 4', hex: '#FFFF00' },
  //   { name: 'Color 5', hex: '#FF00FF' }
  // ];
  
  constructor(vsCodeApiService: VsCodeApiService) {
    this.vscode = vsCodeApiService.getVsCodeApi();
    this.getCurrentTheme();
    window.addEventListener('message', event => {
      const message = event.data;
      if(message.command === 'currentTheme') {
        console.log('RECEIVED OBJ: ', message.data);
        const currentTheme: Preset = message.data;
        this.colors = [
          //{ name: 'Editor', hex: currentTheme.editorColor },
          { name: 'Editor', hex: '#0000FF'},
          { name: 'Side Bar', hex: currentTheme.sidebarColor },
          { name: 'Panel', hex: currentTheme.panelColor },
          { name: 'Status Bar', hex: currentTheme.statusBarColor },
          { name: 'Tabs', hex: currentTheme.tabsColor },
        ];
      }
    });
  }

  getCurrentTheme() {
    this.vscode.postMessage({command: 'getCurrentTheme'});
  }

  ngOnInit() {
    this.getCurrentTheme;
    console.log('Initial colors:', this.colors);
    // this.getCurrentTheme();
    // window.addEventListener('message', event => {
    //   const message = event.data;
    //   console.log('received object: ', message.data);
    // });
  }

  updateColor(newHex: string, index: number) {
    this.colors[index].hex = newHex;
  }

  saveColors() {
    console.log('Colors saved:', this.colors);
  }

}