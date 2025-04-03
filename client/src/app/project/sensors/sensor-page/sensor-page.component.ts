import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RadarPPIComponent } from "../radar-ppi/radar-ppi.component";
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import { DfPPIComponent } from "../df-ppi/df-ppi.component";

@Component({
  selector: 'app-sensor-page',
  standalone: true,
  imports: [RadarPPIComponent, DfPPIComponent],
  templateUrl: './sensor-page.component.html',
  styleUrl: './sensor-page.component.scss'
})
export default class SensorPageComponent implements AfterViewInit{
  @ViewChild('radarPPI') radarPPI:RadarPPIComponent;
  @ViewChild('dfPPI') dfPPI:DfPPIComponent;
  constructor(){}
  ngAfterViewInit(): void {
    this.initSignalR();
  }

  initSignalR() {
      SignalRService.startConnection().then(() => {
        SignalRService.getConnection().invoke('getConnectionId')
          .then((connectionId: string) => {
            console.log("ConnectionId : " + connectionId);
          });
        SignalRService.getConnection().on("sendTarget", (target: Target) => {
          this.radarPPI.addBlip(target.latitude, target.longitude);
          this.dfPPI.addBlip(target.latitude, target.longitude);
        });
      });
    }
}
