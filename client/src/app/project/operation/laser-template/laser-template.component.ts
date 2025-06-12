import { AfterViewInit, Component, inject, Input, input, NgZone, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MtxGridColumn, MtxGridColumnMenu, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-laser-template',
  standalone: true,
  imports: [MatSlideToggleModule, MtxGridModule],
  templateUrl: './laser-template.component.html',
  styleUrl: './laser-template.component.scss'
})
export class LaserTemplateComponent implements OnInit, AfterViewInit {
  constructor(
    private ngZone: NgZone) { }

  @Input() gisObject: GisObject;
  @Input() set target(value: Target) { this.targetList.unshift(value) };
  public map!: L.Map;
  public cls: boolean = false;
  public targetList: Target[] = [];
  public selectedTarget: Target;
  public gtl_lat: number;
  public gtl_lng: number;
  public CLSState: boolean = true;

  private inProccessOperator: boolean = false;
  public laserState: boolean = true;

  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.setStateOperators(false);
  }

  ngAfterViewInit(): void {
    this.initSignalR();
  }

  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("laserState", (state: boolean) => {
        this.laserState = state;
      });
    });
  }

  updateTargetList(target: Target) {
    let existsTargetIdx = this.targetList.findIndex((t: Target) => t.targetId == target.targetId);
    if (existsTargetIdx < 0)
      this.targetList.unshift(target);
    else
      this.targetList[existsTargetIdx] = target;
    this.targetList = [...this.targetList];
  }

  setStateOperators(state: boolean) {
    this.ngZone.run(() => {
      this.cls  = state;
    });
  }
  // targetSelected($event: any[]) {
  //   this.selectedTarget = $event.at(0);
  //   if (!this.inProccessOperator && this.laserState) {
  //     this.setStateOperators(true);
  //     this.inProccessOperator = true;
  //   }
  // }

  Chanel1Togle() {
    this.cls = !this.cls;
    console.log("CLS:", this.cls);
    SignalRService.getConnection().invoke("laserOnOff","cls",this.cls?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }
}
