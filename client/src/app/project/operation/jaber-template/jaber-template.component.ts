import { AfterViewInit, Component, inject, Input, input, NgZone, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MtxGridColumn, MtxGridColumnMenu, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-jaber-template',
  standalone: true,
  imports: [MatSlideToggleModule, MtxGridModule],
  templateUrl: './jaber-template.component.html',
  styleUrl: './jaber-template.component.scss'
})
export class JaberTemplateComponent implements OnInit, AfterViewInit {

  constructor(
    private ngZone: NgZone) { }

  @Input() gisObject: GisObject;
  @Input() set target(value: Target) { this.targetList.unshift(value) };
  public map!: L.Map;
  public goToHome: boolean = false;
  public goToLocation: boolean = false;
  public flying: boolean = false;
  public landing: boolean = false;
  public targetList: Target[] = [];
  public selectedTarget: Target | undefined = undefined;
  public gtl_lat: number = 26.1;
  public gtl_lng: number = 53.4;
  public goToHomeState: boolean = true;
  public goToLocationState: boolean = true;
  public flyingState: boolean = true;
  public landingState: boolean = true;
  private inProccessOperator: boolean = false;
  public jaberState: boolean = true;

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
      SignalRService.getConnection().on("jaberState", (state: boolean) => {
        this.jaberState = state;
      });
    });
  }

  targetSelected($event: any[]) {
    this.selectedTarget = $event.at(0);
    if (!this.inProccessOperator && this.jaberState) {
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
    return "jaberMap_" + this.gisObject.id;
  }

  setStateOperators(state: boolean) {
    this.ngZone.run(() => {
      this.goToHomeState = state;
      this.flyingState = state;
      this.goToLocationState = state;
      this.landingState = state;
    });
  }

  goToHomeTogle() {
    this.goToHome = !this.goToHome;
    console.log("goToHome:", this.goToHome);
     SignalRService.getConnection().invoke("takingPossession",this.selectedTarget.targetId, 0, 0, "backToHome").then(() => {
      this.setStateOperators(false);
    });
  }

  goToLocationTogle() {
    this.goToLocation = !this.goToLocation;
    console.log("goToLocation:", this.goToLocation);
    SignalRService.getConnection().invoke("takingPossession",this.selectedTarget.targetId, this.gtl_lat, this.gtl_lng, "sendLocation").then(() => {
      this.setStateOperators(false);
    });
  }

  flyingTogle() {
    this.flying = !this.flying;
    console.log("flying:", this.flying);
    SignalRService.getConnection().invoke("takingPossession",this.selectedTarget.targetId, 0, 0, "takeOff").then(() => {
      this.setStateOperators(false);
    });
  }

  landingTogle() {
    this.landing = !this.landing;
    console.log("landing:", this.landing);
    SignalRService.getConnection().invoke("takingPossession",this.selectedTarget.targetId, 0, 0, "landing").then(() => {
      this.setStateOperators(false);
    });
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('serialNo'),
      field: 'targetId',
      sortable: false,
      width: '100%',
      pinned: 'left',
    },
    {
      header: this.translate.stream('lat'),
      field: 'latitude',
      sortable: false,
      width: '100%',
      formatter: (rowData) => {
        return rowData.latitude.toFixed(2);
      },
    },
    {
      header: this.translate.stream('lng'),
      field: 'longitude',
      sortable: false,
      width: '100%',
      formatter: (rowData) => {
        return rowData.longitude.toFixed(2);
      },
    },

    {
      header: this.translate.stream('detectedTime'),
      field: 'detectedTime',
      sortable: false,
      width: '100%',
      formatter: (rowData) => {
        return this.formatDate(rowData.detectedTime, 'yyyy-MM-dd HH:mm:ss');
      }
    }
  ];

  formatDate(dateStr, format) {
    let date: Date = new Date(dateStr);
    const map = {
      yyyy: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      dd: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, matched => map[matched]);
  }

  updateTargetList(target: Target) {
    let existsTargetIdx = this.targetList.findIndex((t: Target) => t.targetId == target.targetId);
    if (existsTargetIdx < 0)
      this.targetList.unshift(target);
    else
      this.targetList[existsTargetIdx] = target;
    this.targetList = [...this.targetList];
  }
}
