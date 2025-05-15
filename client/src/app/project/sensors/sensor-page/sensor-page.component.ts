import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';
import { RadarPPIComponent } from "../radar-ppi/radar-ppi.component";
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target, TargetType } from 'app/project/services/target-service.service';
import { DfPPIComponent } from "../df-ppi/df-ppi.component";
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { SaherPPIComponent } from '../saher-ppi/saher-ppi.component';
import { JaberPPIComponent } from "../jaber-ppi/jaber-ppi.component";

@Component({
  selector: 'app-sensor-page',
  standalone: true,
  imports: [RadarPPIComponent, DfPPIComponent, SaherPPIComponent, PageHeaderComponent, JaberPPIComponent],
  templateUrl: './sensor-page.component.html',
  styleUrl: './sensor-page.component.scss'
})
export default class SensorPageComponent implements AfterViewInit {
  @ViewChild('radarPPI') radarPPI: RadarPPIComponent;
  @ViewChild('dfPPI') dfPPI: DfPPIComponent;
  @ViewChild('saherPPI') saherPPI: SaherPPIComponent;
  @ViewChild('jaberPPI') jaberPPI: JaberPPIComponent;
  constructor(
    private ngZone: NgZone
  ) { }
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
        switch (target.detector.objectType.name) {
          case "JaberSystem": this.jaberPPI.updateTargetList(target);
            break;
          case "SaherSystem": this.saherPPI.updateTargetList(target);
            break;
          case "KashefSystem": this.radarPPI.updateTargetList(target);
            break;
          default://this.dfPPI.updateTargetList(target);
            break;
        }
      });
    });
  }
}
