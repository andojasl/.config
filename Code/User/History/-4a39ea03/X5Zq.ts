import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  standalone: true,
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  themes: string[] = []; // Replace with actual data fetching logic

  constructor() {}

  ngOnInit(): void {
    // Example data fetching logic
    // Uncomment the next line to add themes and test dynamic blocks
    // this.themes = ['Theme 1', 'Theme 2', 'Theme 3'];
  }
}