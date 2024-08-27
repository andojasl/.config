import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  template: `<h1>Hello world!</h1>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Homes';
}
