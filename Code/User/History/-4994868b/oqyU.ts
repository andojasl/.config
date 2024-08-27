import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-workbench',
  standalone: true,
  imports: [],
  templateUrl: './edit-workbench.component.html',
  styleUrl: './edit-workbench.component.css'
})
export class EditWorkbenchComponent {
  colors = [
    { name: 'Color 1', hex: '#FF0000' },
    { name: 'Color 2', hex: '#00FF00' },
    { name: 'Color 3', hex: '#0000FF' },
    { name: 'Color 4', hex: '#FFFF00' },
    { name: 'Color 5', hex: '#FF00FF' }
  ];

  updateColor(index: number) {
    // Perform validation if needed, for example to ensure the hex is valid
    // Example: this.colors[index].hex = this.colors[index].hex.toUpperCase();
  }

  saveColors() {
    // Logic to save colors, e.g., send to a server or store locally
    console.log('Colors saved:', this.colors);
  }

}
