import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-syntax',
  standalone: true,
  imports: [],
  templateUrl: './edit-syntax.component.html',
  styleUrl: './edit-syntax.component.css'
})
export class EditSyntaxComponent {

  colors = [
    { name: 'Color 1', hex: '#FF0000' },
    { name: 'Color 2', hex: '#00FF00' },
    { name: 'Color 3', hex: '#0000FF' },
    { name: 'Color 4', hex: '#FFFF00' },
    { name: 'Color 5', hex: '#FF00FF' }
  ];


  ngOnInit() {
    console.log('Initial colors:', this.colors);
  }

  updateColor(newHex: string, index: number) {
    this.colors[index].hex = newHex;
  }

  saveColors() {
    console.log('Colors saved:', this.colors);
  }
}
