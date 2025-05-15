import { AfterViewInit, Component, Input, NgZone, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GisObject } from 'app/project/services/gis-object.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';
import { CommandName } from 'protractor';

@Component({
  selector: 'app-saher-template',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './saher-template.component.html',
  styleUrl: './saher-template.component.scss'
})
export class SaherTemplateComponent implements OnInit, AfterViewInit {

  constructor(
    private ngZone: NgZone
  ) { }

  @Input() gisObject: GisObject;
  @Input() target: Target;
  public map!: L.Map;
  public motor: boolean = false;
  public jammer2_4: boolean = false;
  public jammer5_8: boolean = false;
  public jammer400: boolean = false;
  public jammer900: boolean = false;
  public jammerGPS: boolean = false;
  public jammerAll: boolean = false;
  ngOnInit(): void {
    this.initSignalR();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    SignalRService.getConnection().invoke("saherStatusRequest")
    setInterval(() => {
      SignalRService.getConnection().invoke("saherStatusRequest");
    }, 3000);
  }

  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("jammersAndMotorStatus", (motor: boolean, jammer2_4: boolean, jammer5_8: boolean, jammer400: boolean, jammer900: boolean, jammersGPS: boolean, autoControl: boolean) => {
        this.ngZone.run(() => {
          this.motor = motor;
          this.jammer2_4 = jammer2_4;
          this.jammer5_8 = jammer5_8;
          this.jammer400 = jammer400;
          this.jammer900 = jammer900;
          this.jammerGPS = jammersGPS;
          this.jammerAll = jammer2_4 && jammer5_8 && jammer400 && jammer900 && jammersGPS;
        });
      });
    });
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
    return "saherMap_" + this.gisObject.id;
  }
  allJammerTogle() {
    this.jammerAll = !this.jammerAll;
    this.jammer2_4 = this.jammerAll;
    this.jammer5_8 = this.jammerAll;
    this.jammer400 = this.jammerAll;
    this.jammer900 = this.jammerAll;
    this.jammerGPS = this.jammerAll;
    this.jammerAll = this.jammerAll;
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"JammerAll");
    // SignalRService.getConnection().invoke("callCommand",{
    //   commandName: "saher_TurnOn_Off",
    //   gisObjectId: this.gisObject.id,
    //   args: ["JammerAll"]});
  }
  motorTogle() {
    this.motor = !this.motor;
    console.log("Motor:", this.motor);
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"motor");
  }

  jammer2_4Togle() {
    this.jammer2_4 = !this.jammer2_4;
    console.log("Jammer2.4 :", this.jammer2_4);
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"Jammer2.4");
  }

  jammer5_8Togle() {
    this.jammer5_8 = !this.jammer5_8;
    console.log("Jammer5.8 :", this.jammer5_8);
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"Jammer5.8");
  }
  jammer400Togle() {
    this.jammer400 = !this.jammer400;
    console.log("Jammer400 :", this.jammer400);
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"Jammer400");
  }
  jammer900Togle() {
    this.jammer900 = !this.jammer900;
    console.log("Jammer900 :", this.jammer900);
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"Jammer900");
  }
  jammerGPSTogle() {
    this.jammerGPS = !this.jammerGPS;
    console.log("JammerGPS :", this.jammerGPS);
    SignalRService.getConnection().invoke("saher_TurnOn_Off" ,"JammerGPS");
  }

}
