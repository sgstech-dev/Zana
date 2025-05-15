import { Component, inject, Input, numberAttribute } from '@angular/core';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeUtilityService } from 'app/project/services/date-time-utility.service';
import { SensorCompenent } from '../sensor-component';

@Component({
  selector: 'app-df-ppi',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './df-ppi.component.html',
  styleUrl: './df-ppi.component.scss'
})
export class DfPPIComponent extends SensorCompenent {
  @Input({ required: true, transform: numberAttribute }) override centerLat: number;
  @Input({ required: true, transform: numberAttribute }) override centerLng: number;
  @Input({ required: true, transform: numberAttribute }) override radius: number;
  @Input({ required: true }) override sensorName: string;

  private readonly translate = inject(TranslateService);

  constructor(
    private dateTimeUtilityService: DateTimeUtilityService,
  ) {
    super();
  }

  setColumns(): void {
    this.columns = [
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
}
