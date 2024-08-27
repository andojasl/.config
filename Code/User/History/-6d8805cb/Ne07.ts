import { Component, EventEmitter, Output } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ColorPicker } from 'iro.js';


@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements AfterViewInit {
  private colorPicker: ColorPicker | undefined;
  @Output() colorChange = new EventEmitter<string>();

  ngAfterViewInit() {
    this.colorPicker = new ColorPicker('#defaultPicker', {
      width: 250,
      color: 'rgb(255, 0, 0)',
      borderWidth: 1,
      borderColor: '#fff'
    });

    this.colorPicker.on('color:change', (color) => {
      this.colorChange.emit(color.hexString);
    });
  }
}
