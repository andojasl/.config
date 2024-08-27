import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VsCodeApiService } from 'src/vsCodeAPIService';
import { Preset } from 'ext-src/dataObjects';
@Component({
  selector: 'app-edit-syntax',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-syntax.component.html',
  styleUrl: './edit-syntax.component.css'
})
export class EditSyntaxComponent {
  private vscode: any;

  syntaxColors: { scope: string | string[], settings: { foreground: string } }[] = [];
  displayedColors: { scope: string | string[], settings: { foreground: string } }[] = [];
  currentPage = 0;
  currentTheme: Preset = {
    id: 0,
    name: '',
    editorColor: '',
    sidebarColor: '',
    panelColor: '',
    statusBarColor: '',
    tabsColor: '',
    tokenColors: ''
  };

  constructor(vsCodeApiService: VsCodeApiService) {
    this.vscode = vsCodeApiService.getVsCodeApi();
    this.getCurrentTheme();
    window.addEventListener('message', event => {
      const message = event.data;
      if (message.command === 'currentTheme') {
        this.currentTheme = message.data;
        this.syntaxColors = JSON.parse(this.currentTheme.tokenColors);
        this.updateDisplayedColors();
      }
    });
  }

  getCurrentTheme() {
    this.vscode.postMessage({ command: 'getCurrentTheme' });
  }

  updateDisplayedColors() {
    const startIndex = this.currentPage * 5;
    this.displayedColors = this.syntaxColors.slice(startIndex, startIndex + 5);
  }

  nextPage() {
    if ((this.currentPage + 1) * 5 < this.syntaxColors.length) {
      this.currentPage++;
      this.updateDisplayedColors();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedColors();
    }
  }

  updateColor(newHex: string, index: number) {
    const globalIndex = this.currentPage * 5 + index;
    this.syntaxColors[globalIndex].settings.foreground = newHex;
  }

  saveColors() {
    const updatedTokenColors = JSON.stringify(this.syntaxColors);
    this.currentTheme.tokenColors = updatedTokenColors;
    this.vscode.postMessage({ command: 'updatePreset', data: this.currentTheme });
  }
}