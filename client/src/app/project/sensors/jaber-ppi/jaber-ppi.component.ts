import { AfterViewInit, Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeUtilityService } from 'app/project/services/date-time-utility.service';
import { PpiUtilityService } from 'app/project/services/ppi-utility.service';
import { Target } from 'app/project/services/target-service.service';
import { randomUUID, UUID } from 'crypto';
import * as L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-jaber-ppi',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './jaber-ppi.component.html',
  styleUrl: './jaber-ppi.component.scss'
})
export class JaberPPIComponent implements OnInit, AfterViewInit {
  @Input({ required: true, transform: numberAttribute }) centerLat: number;
  @Input({ required: true, transform: numberAttribute }) centerLng: number;
  @Input({ required: true, transform: numberAttribute }) radius: number;
  @Input({ required: true }) sensorName: string;
  public mapId: UUID = uuidv4();
  private center: L.LatLng;
  private map: L.Map;
  public targetList: Target[] = [];
  private readonly translate = inject(TranslateService);
  public isLoading: boolean = false;

  constructor(
      private dateTimeUtilityService: DateTimeUtilityService,
      private ppiUtilityService: PpiUtilityService
  ) { }
  ngAfterViewInit(): void {
    this.center = L.latLng(this.centerLat, this.centerLng);
    this.initializeMap();
    this.ppiUtilityService.drawPPIAxis(this.map, this.center, this.radius);
    this.ppiUtilityService.drawFadingCircle(this.map, 32, 54.1);
    this.ppiUtilityService.drawFadingCircle(this.map, 30.5, 57.8);
  }
  ngOnInit(): void {

  }
  private initializeMap() {
    this.map = L.map(this.mapId, {
      contextmenu: true,
      center: this.center,
      zoom: 7,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      zoomControl: false,
      attributionControl: false,
      dragging: false, // Disable panning
      scrollWheelZoom: false, // Disable zooming with the scroll wheel
      doubleClickZoom: false, // Disable zooming on double click
      touchZoom: false,
    });
  }


  public addBlip(lat: number, lng: number) {
    this.ppiUtilityService.drawFadingCircle(this.map, lat, lng);
  }

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('targetSerialNo'),
      field: 'targetId',
      sortable: false,
      width: '100%'
    },
    {
      header: this.translate.stream('enableHunted'),
      field: 'enableHunted',
      sortable: false,
      width: '100%',
      type: 'tag',
      tag: {
        true: { text: 'Yes' },
        false: { text: 'No' },
      },
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
        return this.dateTimeUtilityService.formatDate(rowData.detectedTime, 'yyyy-MM-dd HH:mm:ss');
      }
    }
  ]
}
