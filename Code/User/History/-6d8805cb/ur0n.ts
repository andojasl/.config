import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements AfterViewInit {
  private colorPicker: any;
  @Output() colorChange = new EventEmitter<string>();

  async ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    const Iro = await import('@jaames/iro');
    const IroColorPicker = Iro.default || Iro;
    this.colorPicker = new IroColorPicker('#defaultPicker', {
      width: 250,
      color: 'rgb(255, 0, 0)',
      borderWidth: 1,
      borderColor: '#fff'
    });

    this.colorPicker.on('color:change', (color) => {
      console.log('Color changed:', color.hexString);
      this.colorChange.emit(color.hexString);
    });
  }
}
