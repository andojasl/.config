import { Component } from '@angular/core';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housinglocation';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HousingLocationComponent]
})

export class HomeComponent {
    readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  
    housingLocation: HousingLocation = {
      id: 9999,
      name: 'Test Home',
      city: 'Test city',
      state: 'ST',
      photo: `${this.baseUrl}/example-house.jpg`,
      availableUnits: 99,
      wifi: true,
      laundry: false,
  };
}
