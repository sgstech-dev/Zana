import { Component, inject, Input, numberAttribute } from '@angular/core';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeUtilityService } from 'app/project/services/date-time-utility.service';

import { SensorCompenent } from '../sensor-component';

@Component({
  selector: 'app-radar-ppi',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './radar-ppi.component.html',
  styleUrl: './radar-ppi.component.scss'
})
export class RadarPPIComponent extends SensorCompenent {
  private readonly translate = inject(TranslateService);
  @Input({ required: true, transform: numberAttribute }) override centerLat!: number;
  @Input({ required: true, transform: numberAttribute }) override centerLng!: number;
  @Input({ required: true, transform: numberAttribute }) override radius!: number;
  @Input({ required: true }) override sensorName!: string;
  
  constructor(
    private dateTimeUtilityService: DateTimeUtilityService
  ) {
    super();
  }

  setColumns(): void {
    this.columns = [
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
  
}
