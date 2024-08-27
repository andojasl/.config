import { Component } from '@angular/core';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-color-scheme',
  standalone: true,
  imports: [ColorSketchModule, CommonModule],
  templateUrl: './generate-color-scheme.component.html',
  styleUrl: './generate-color-scheme.component.css'
})
export class GenerateColorSchemeComponent {
  primaryColor: string = '#ff0000'; // Default color

  openColorPicker() {}
  generateRandomColor(): void {
    this.primaryColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
