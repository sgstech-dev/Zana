import { Component } from '@angular/core';
import { RadarPPIComponent } from "../radar-ppi/radar-ppi.component";

@Component({
  selector: 'app-sensor-page',
  standalone: true,
  imports: [RadarPPIComponent],
  templateUrl: './sensor-page.component.html',
  styleUrl: './sensor-page.component.scss'
})
export default class SensorPageComponent {

}
