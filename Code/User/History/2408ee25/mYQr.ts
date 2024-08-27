import { Component } from '@angular/core';
import { ColorSketchModule } from 'ngx-color/sketch';

@Component({
  selector: 'app-generate-color-scheme',
  standalone: true,
  imports: [ColorSketchModule],
  templateUrl: './generate-color-scheme.component.html',
  styleUrl: './generate-color-scheme.component.css'
})
export class GenerateColorSchemeComponent {

}
