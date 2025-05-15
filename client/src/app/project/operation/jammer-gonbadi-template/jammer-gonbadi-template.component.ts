import { AfterViewInit, Component, inject, Input, input, NgZone, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MtxGridColumn, MtxGridColumnMenu, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-jammer-gonbadi-template',
  standalone: true,
  imports: [MatSlideToggleModule, MtxGridModule],
  templateUrl: './jammer-gonbadi-template.component.html',
  styleUrl: './jammer-gonbadi-template.component.scss'
})
export class JammerGonbadiTemplateComponent implements OnInit, AfterViewInit {
  AllChanelState: any;


  constructor(
    private ngZone: NgZone) { }

  @Input() gisObject: GisObject;
  @Input() set target(value: Target) { this.targetList.unshift(value) };
  public map!: L.Map;
  public Chanel1: boolean = false;
  public Chanel2: boolean = false;
  public Chanel3: boolean = false;
  public Chanel4: boolean = false;
  public Chanel5: boolean = false;
  public Chanel6: boolean = false;
  public AllChanel: boolean = false;
  public targetList: Target[] = [];
  public selectedTarget: Target;
  public gtl_lat: number;
  public gtl_lng: number;
  public Chanel1State: boolean = true;
  public Chanel2State: boolean = true;
  public Chanel3State: boolean = true;
  public Chanel4State: boolean = true;
  public Chanel5State: boolean = true;
  public Chanel6State: boolean = true;
  private inProccessOperator: boolean = false;
  public jammerGonbadiState: boolean = false;

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
      SignalRService.getConnection().on("jammer-gonbadiState", (state: boolean) => {
        this.jammerGonbadiState = state;
      });
    });
  }

  // targetSelected($event: any[]) {
  //   this.selectedTarget = $event.at(0);
  //   if (!this.inProccessOperator && this.jammerGonbadiState) {
  //     this.setStateOperators(true);
  //     this.inProccessOperator = true;
  //   }
  // }

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
    return "jammer-gonbadiMap_" + this.gisObject.id;
  }

  setStateOperators(state: boolean) {
    this.ngZone.run(() => {
      this.Chanel1 = state;
      this.Chanel3 = state;
      this.Chanel2 = state;
      this.Chanel4 = state;
      this.Chanel5 = state;
      this.Chanel6 = state;
    });
  }

  Chanel1Togle() {
    this.Chanel1 = !this.Chanel1;
    console.log("Chanel1:", this.Chanel1);
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","Chanel1",this.Chanel1?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Chanel2Togle() {
    this.Chanel2 = !this.Chanel2;
    console.log("Chanel2:", this.Chanel2);
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","Chanel2",this.Chanel2?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Chanel3Togle() {
    this.Chanel3 = !this.Chanel3;
    console.log("Chanel3:", this.Chanel3);
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","Chanel3",this.Chanel3?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Chanel4Togle() {
    this.Chanel4 = !this.Chanel4;
    console.log("Chanel4:", this.Chanel4);
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","Chanel4",this.Chanel4?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Chanel5Togle() {
    this.Chanel5 = !this.Chanel5;
    console.log("Chanel5:", this.Chanel5);
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","Chanel5",this.Chanel5?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  Chanel6Togle() {
    this.Chanel6 = !this.Chanel6;
    console.log("Chanel6:", this.Chanel6);
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","Chanel6",this.Chanel6?"On":"Off").then(() =>{
      this.setStateOperators(false);
    });
  }

  AllChanelTogle() {
    this.AllChanel = !this.AllChanel;
    console.log("All Chanel");
    
    SignalRService.getConnection().invoke("jammerGonbadiOnOff","All",this.AllChanel?"On":"Off").then(() =>{
      this.setStateOperators(this.AllChanel);
    });
  }
}
