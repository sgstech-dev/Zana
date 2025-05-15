import { AfterViewInit, Component, inject, Input, input, NgZone, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MtxGridColumn, MtxGridColumnMenu, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-sadid-template',
  standalone: true,
  imports: [MatSlideToggleModule, MtxGridModule],
  templateUrl: './sadid-template.component.html',
  styleUrl: './sadid-template.component.scss'
})
export class SadidTemplateComponent implements OnInit, AfterViewInit {

  constructor(
    private ngZone: NgZone) { }

  @Input() gisObject: GisObject;
  @Input() set target(value: Target) { this.targetList.unshift(value) };
  public map!: L.Map;
  public Band1: boolean = false;
  public Band2: boolean = false;
  public Band3: boolean = false;
  public Band4: boolean = false;
  public targetList: Target[] = [];
  public selectedTarget: Target;
  public gtl_lat: number;
  public gtl_lng: number;
  public Band1State: boolean = true;
  public Band2State: boolean = true;
  public Band3State: boolean = true;
  public Band4State: boolean = true;
  private inProccessOperator: boolean = false;
  public sadidState:boolean = false;

  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.setStateOperators(false);
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.initSignalR();
  }

  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("sadidState", (state: boolean) => {
        this.sadidState = state;
      });
    });
  }

  targetSelected($event: any[]) {
    this.selectedTarget = $event.at(0);
    if(!this.inProccessOperator && this.sadidState)
    {
      this.setStateOperators(true);
      this.inProccessOperator = true;
    }
  }

  private initializeMap() {
    // this.map = L.map(this.getMapId(), {
    //   contextmenu: false,
    //   center: [32.505, 54],
    //   zoom: 12
    // });
    // const mapLayer = L.tileLayer("http://localhost/MapData/{z}/{z}_{x}_{y}.png");
    // mapLayer.addTo(this.map);
  }
  getMapId(): string {
    return "sadidMap_" + this.gisObject.id;
  }

  setStateOperators(state: boolean) {
    this.ngZone.run(() => {
      this.Band1State = state;
      this.Band3State = state;
      this.Band2State = state;
      this.Band4State = state;
    });
  }

  Band1Togle() {
    this.Band1 = !this.Band1;
    console.log("Band1:", this.Band1);
    SignalRService.getConnection().invoke("bandTurnOnOff","Band1",this.Band1?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Band2Togle() {
    this.Band2 = !this.Band2;
    console.log("Band2:", this.Band2);
    SignalRService.getConnection().invoke("bandTurnOnOff","Band2",this.Band2?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Band3Togle() {
    this.Band3 = !this.Band3;
    console.log("Band3:", this.Band3);
    SignalRService.getConnection().invoke("bandTurnOnOff","Band3",this.Band3?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Band4Togle() {
    this.Band4 = !this.Band4;
    console.log("Band4:", this.Band4);
    SignalRService.getConnection().invoke("bandTurnOnOff","Band4",this.Band4?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }
}
