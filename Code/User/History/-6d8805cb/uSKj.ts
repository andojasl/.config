import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  @Input() selectedColor: string = '#ffffff'; // Default color
  @Output() colorChange = new EventEmitter<string>();

  constructor() {}

  onInputChange(): void {
    this.colorChange.emit(this.selectedColor);
  }
}