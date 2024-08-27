import { Component } from '@angular/core';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-generate-color-scheme',
  standalone: true,
  imports: [ColorSketchModule, CommonModule, ColorPickerComponent],
  templateUrl: './generate-color-scheme.component.html',
  styleUrl: './generate-color-scheme.component.css'
})
export class GenerateColorSchemeComponent {
  showColorPicker = false;
  currentColor = '#ff0000'; // Initial color

  constructor() {}

  openColorPicker(): void {
    this.showColorPicker = true;
  }

  onColorPickerChange(color: string): void {
    this.currentColor = color;
    // Optionally, close the color picker after selecting a color
    this.showColorPicker = false;
  }
}
