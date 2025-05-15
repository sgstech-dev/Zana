import { AfterViewInit, Component, inject, Input, NgZone, numberAttribute, OnInit } from '@angular/core';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeUtilityService } from 'app/project/services/date-time-utility.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SignalRService } from 'app/project/services/signal-r.service';
import { SensorCompenent } from '../sensor-component';

@Component({
  selector: 'app-saher-ppi',
  standalone: true,
  imports: [MtxGridModule, MatSlideToggleModule],
  templateUrl: './saher-ppi.component.html',
  styleUrl: './saher-ppi.component.scss'
})
export class SaherPPIComponent extends SensorCompenent implements OnInit, AfterViewInit {

  @Input({ required: true, transform: numberAttribute }) override centerLat: number;
  @Input({ required: true, transform: numberAttribute }) override centerLng: number;
  @Input({ required: true, transform: numberAttribute }) override radius: number;
  @Input({ required: true }) override sensorName: string;

  //public directionList: Target[] = [];
  private readonly translate = inject(TranslateService);
  private readonly ngZoneForMotor = inject(NgZone);

  motor: boolean;

  constructor(
    private dateTimeUtilityService: DateTimeUtilityService
  ) {
    super();
  }
  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.initSignalR();
  }
  ngOnInit(): void {
    SignalRService.getConnection().invoke("saherStatusRequest");
    setInterval(() => {
      SignalRService.getConnection().invoke("saherStatusRequest");
    }, 3000);
  }

  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("jammersAndMotorStatus", (motor: boolean, jammer2_4: boolean, jammer5_8: boolean, jammer400: boolean, jammer900: boolean, jammersGPS: boolean, autoControl: boolean) => {
        this.ngZoneForMotor.run(() => {
          this.motor = motor;
        });
      });
    });
  }

  motorTogle() {
    this.motor = !this.motor;
    console.log("Motor:", this.motor);
    SignalRService.getConnection().invoke("saher_TurnOn_Off","motor");
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
        header: this.translate.stream('distance'),
        field: 'range',
        sortable: false,
        width: '100%',
        formatter: (rowData) => {
          return rowData.range.toFixed(2);
        },
      },
      {
        header: this.translate.stream('deviceType'),
        field: 'deviceType',
        sortable: false,
        width: '100%'
      },
      {
        header: this.translate.stream('bandWidth'),
        field: 'centerFreq',
        sortable: false,
        width: '100%'
      },
      {
        header: this.translate.stream('snr'),
        field: 'snr',
        sortable: false,
        width: '100%'
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
