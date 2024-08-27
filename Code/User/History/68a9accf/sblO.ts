import { Component } from '@angular/core';
import { HousingLocationComponent } from "../housing-location/housing-location.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HousingLocationComponent]
})
export class HomeComponent {

}
