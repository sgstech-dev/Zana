import { AfterViewInit, Component, inject, Input, input, NgZone, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { MoonSocketService } from 'app/project/services/moon-socket.service';
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

  constructor(private moonSocketService: MoonSocketService, private ngZone: NgZone) { }

  @Input() gisObject: GisObject;
  @Input() target: Target;
  public map!: L.Map;
  public goToHome: boolean = false;
  public goToLocation: boolean = false;
  public flying: boolean = false;
  public landing: boolean = false;
  public targetList: Target[] = [];
  private readonly translate = inject(TranslateService);

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
    return "jaberMap_" + this.gisObject.id;
  }

  columns: MtxGridColumn[] = [
    // {
    //   header: this.translate.stream('targetSerialNo'),
    //   field: 'targetId',
    //   sortable: false,
    //   width: '100%'
    // },
    // {
    //   header: this.translate.stream('enableHunted'),
    //   field: 'enableHunted',
    //   sortable: false,
    //   width: '100%',
    //   type: 'tag',
    //   tag: {
    //     true: { text: 'Yes' },
    //     false: { text: 'No' },
    //   },
    // },
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
      header: this.translate.stream('alt'),
      field: 'altitude',
      sortable: false,
      width: '100%',
      formatter: (rowData) => {
        return rowData.elevation.toFixed(2);
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
}
