import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
  export class LibraryComponent implements OnInit {
    themes: string[] = []; // Replace with actual data fetching logic
  
    constructor() {}
  
    ngOnInit(): void {
      // Example data, replace with actual fetching logic
      this.themes = ['Theme 1', 'Theme 2', 'Theme 3'];
    }
}
