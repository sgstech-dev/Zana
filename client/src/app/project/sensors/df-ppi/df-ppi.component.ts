import { AfterViewInit, Component, inject, Input, numberAttribute, OnInit, ViewChild } from '@angular/core';
import { randomUUID, UUID } from 'crypto';
import * as L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { Target } from 'app/project/services/target-service.service';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeUtilityService } from 'app/project/services/date-time-utility.service';
import { PpiUtilityService } from 'app/project/services/ppi-utility.service';

@Component({
  selector: 'app-df-ppi',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './df-ppi.component.html',
  styleUrl: './df-ppi.component.scss'
})
export class DfPPIComponent implements OnInit, AfterViewInit {
  @Input({ required: true, transform: numberAttribute }) centerLat: number;
  @Input({ required: true, transform: numberAttribute }) centerLng: number;
  @Input({ required: true, transform: numberAttribute }) radius: number;
  @Input({ required: true }) sensorName: string;
  @Input({ required: true }) color: string = "red";

  mapId: UUID = uuidv4();
  private center: L.LatLng;
  private map: L.Map;
  public directionList: Target[] = [];
  private readonly translate = inject(TranslateService);
  isLoading: boolean = false;

  constructor(
    private dateTimeUtilityService: DateTimeUtilityService,
    private ppiUtilityService: PpiUtilityService
  ) { }
  ngAfterViewInit(): void {
    this.center = L.latLng(this.centerLat, this.centerLng);
    this.initializeMap();
    this.ppiUtilityService.drawPPIAxis(this.map, this.center, this.radius);
  }
  ngOnInit(): void {

  }
  private initializeMap() {
    this.map = L.map(this.mapId, {
      contextmenu: true,
      center: this.center,
      zoom: 7,
     // subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      zoomControl: false,
      attributionControl: false,
      dragging: false, // Disable panning
      scrollWheelZoom: false, // Disable zooming with the scroll wheel
      doubleClickZoom: false, // Disable zooming on double click
      touchZoom: false,
    });
  }

  public addDirection(theta: number, range: number = this.radius) {

    this.ppiUtilityService.drawFadingLine(this.map, this.center, range, theta, this.color);
  }


  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('theta'),
      field: 'theta',
      sortable: false,
      width: '100%',
      formatter: (rowData) => {
        return rowData.theta.toFixed(2);
      },
    },
    {
      header: this.translate.stream('range'),
      field: 'range',
      sortable: false,
      width: '100%',
      formatter: (rowData) => {
        return rowData.range.toFixed(2);
      },
    },
    {
      header: this.translate.stream('elevation'),
      field: 'elevation',
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
      class: 'date-time-Cell',
      formatter: (rowData) => {
        return this.dateTimeUtilityService.formatDate(rowData.detectedTime, 'yyyy-MM-dd HH:mm:ss');
      }
    }
  ]

}
