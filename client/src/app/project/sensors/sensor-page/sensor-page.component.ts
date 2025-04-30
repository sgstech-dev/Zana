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
        if (target.targetType == TargetType.Position) {
          if (target.detector.objectType.name == "JaberSystem") {
            this.jaberPPI.addBlip(target.latitude, target.longitude);
            this.ngZone.run(() => {
              let existsTargetIdx = this.jaberPPI.targetList.findIndex((t: Target) => t.targetId == target.targetId);
              if (existsTargetIdx < 0)
                this.jaberPPI.targetList.unshift(target);
              else
              this.jaberPPI.targetList[existsTargetIdx] = target;

              if (this.jaberPPI.targetList.length > 5)
                this.jaberPPI.targetList.pop();
              this.jaberPPI.targetList = [...this.jaberPPI.targetList];
            });
          }
          else {
            this.radarPPI.addBlip(target.latitude, target.longitude);
            this.ngZone.run(() => {
              this.radarPPI.targetList.unshift(target);
              if (this.radarPPI.targetList.length > 5)
                this.radarPPI.targetList.pop();
              this.radarPPI.targetList = [...this.radarPPI.targetList];
            });
          }
        }
        else if (target.targetType == TargetType.Direction) {
          if (target.detector.objectType.name == "SaherSystem") {
            this.saherPPI.addDirection(target.theta, this.saherPPI.radius);
            this.ngZone.run(() => {
              this.saherPPI.directionList.unshift(target);
              if (this.saherPPI.directionList.length > 5)
                this.saherPPI.directionList.pop();
              this.saherPPI.directionList = [...this.saherPPI.directionList];
            });
          }
          else {
            this.dfPPI.addDirection(target.theta, this.dfPPI.radius);
            this.ngZone.run(() => {
              this.dfPPI.directionList.unshift(target);
              if (this.dfPPI.directionList.length > 5)
                this.dfPPI.directionList.pop();
              this.dfPPI.directionList = [...this.dfPPI.directionList];
            });
          }
        }
      });
    });
  }
}
