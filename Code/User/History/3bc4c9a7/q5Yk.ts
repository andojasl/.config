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

  colors: { name: string; hex: string }[] = [];

  displayedColors: { name: string; hex: string; }[] = [];
  currentPage = 0;

  constructor() {
    this.updateDisplayedColors();
  }


  getCurrentTheme() {
    this.vscode.postMessage({command: 'getCurrentTheme'});
  }
  updateDisplayedColors() {
    const startIndex = this.currentPage * 5;
    this.displayedColors = this.colors.slice(startIndex, startIndex + 5);
  }

  nextPage() {
    if ((this.currentPage + 1) * 5 < this.colors.length) {
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
    this.colors[index].hex = newHex;
  }

  saveColors() {
    console.log('Colors saved:', this.colors);
  }
}
