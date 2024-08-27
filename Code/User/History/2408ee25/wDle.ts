import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-generate-color-scheme',
  standalone: true,
  imports: [ColorPickerModule,ReactiveFormsModule, ColorSketchModule, CommonModule, ColorPickerComponent],
  templateUrl: './generate-color-scheme.component.html',
  styleUrl: './generate-color-scheme.component.css'
})
export class GenerateColorSchemeComponent {
 
}
