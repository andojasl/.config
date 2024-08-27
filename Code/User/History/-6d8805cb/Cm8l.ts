import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  @Input() selectedColor: string = '#ffffff'; // Default color
  @Output() colorChange = new EventEmitter<string>();

  constructor() {}

  onColorChange(event: any): void {
    this.selectedColor = event.color.hex;
    this.colorChange.emit(this.selectedColor);
  }

  onInputChange(): void {
    this.colorChange.emit(this.selectedColor);
  }
}
