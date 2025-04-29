import { AfterViewInit, Component, Input, input, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GisObject } from 'app/project/services/gis-object.service';
import { MoonSocketService } from 'app/project/services/moon-socket.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-saher-template',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './saher-template.component.html',
  styleUrl: './saher-template.component.scss'
})
export class SaherTemplateComponent implements OnInit, AfterViewInit {

  constructor(private moonSocketService: MoonSocketService) { }

  @Input() gisObject: GisObject;
  @Input() target: Target;
  public map!: L.Map;
  public jammer2_4: boolean = false;
  public jammer5_8: boolean = false;
  public jammer400: boolean = false;
  public jammer900: boolean = false;
  public jammerGPS: boolean = false;
  public jammerAll: boolean = false;
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initializeMap();
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
    this.moonSocketService.saher_TurnOn_Off("JammerAll").subscribe();
  }
  jammer2_4Togle() {
    this.jammer2_4 = !this.jammer2_4;
    console.log("Jammer2.4 :", this.jammer2_4);
    this.moonSocketService.saher_TurnOn_Off("Jammer2.4").subscribe();
  }

  jammer5_8Togle() {
    this.jammer5_8 = !this.jammer5_8;
    console.log("Jammer5.8 :", this.jammer5_8);
    this.moonSocketService.saher_TurnOn_Off("Jammer5.8").subscribe();
  }
  jammer400Togle() {
    this.jammer400 = !this.jammer400;
    console.log("Jammer400 :", this.jammer400);
    this.moonSocketService.saher_TurnOn_Off("Jammer400").subscribe();
  }
  jammer900Togle() {
    this.jammer900 = !this.jammer900;
    console.log("Jammer900 :", this.jammer900);
    this.moonSocketService.saher_TurnOn_Off("Jammer900").subscribe();
  }
  jammerGPSTogle() {
    this.jammerGPS = !this.jammerGPS;
    console.log("JammerGPS :", this.jammerGPS);
    this.moonSocketService.saher_TurnOn_Off("JammerGPS").subscribe();
  }

}
