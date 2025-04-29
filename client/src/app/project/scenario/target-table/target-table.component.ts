import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, input, NgZone, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeUtilityService } from 'app/project/services/date-time-utility.service';
import { GisObjectMetaData, GisObjectMetaDataService } from 'app/project/services/gis-object-meta-data.service';
import { GisObject, GisObjectService } from 'app/project/services/gis-object.service';
import { Scenario, ScenarioService } from 'app/project/services/scenario.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-target-table',
  standalone: true,
  imports: [
    MtxGridModule
  ],
  templateUrl: './target-table.component.html',
  styleUrl: './target-table.component.scss'
})
export class TargetTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() deleteTargetLayer = new EventEmitter<number>();
  @Output() flyTo = new EventEmitter<number>();

  @Input({ required: true }) scenario_id: number;
  @Input({ required: true }) isAircraft: boolean;
  @Input({ required: true }) gisObjectLayers: L.FeatureGroup;
  @ViewChild('colorCircle', { static: true }) colorCircle!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: false }) statusTemplate!: TemplateRef<any>;
  gisObjectColors: Map<number, string> = new Map<number, string>();

  list: Target[] = [];
  targetsStatus: Map<number, string> = new Map<number, string>;
  isLoading: boolean = true;
  private readonly translate = inject(TranslateService);
  private scenarioSubscription: Subscription;

  constructor(
    private gisObjectService: GisObjectService,
    private dateTimeUtilityService: DateTimeUtilityService,
    private ngZone: NgZone,
    private gisObjectMetaDataService: GisObjectMetaDataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.scenarioSubscription) {
      this.scenarioSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.initSignalR();

  }
  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("sendTarget", (target: Target) => {
        this.ngZone.run(() => {
          this.ngZone.run(() => {
            this.list.unshift(target);
            if (this.list.length > 10)
              this.list.pop();
            this.list = [...this.list];
          });
        });
      });
    });
  }

  setGisObjectColors(objectId: number, color: string) {
    this.gisObjectColors.set(objectId, color);
  }

  delete(id: number): void {
    this.gisObjectService.delete(id).subscribe({
      next: () => {
        let foundTargetIdx = this.list.findIndex((x: { id: number; }) => x.id === id);
        this.list.splice(foundTargetIdx, 1);
        this.list = [...this.list];
        this.deleteTargetLayer.emit(id);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  edit(target: Target): void {
    this.flyTo.emit(target.id);
    // this.objectTypeForm.setValue({
    //   id:objectType.id,
    //   name:objectType.name,
    //   category_id:objectType.category_id,
    //   category: this.categories.find(c=>c.id == objectType.category_id)});
    // this.picPreview = objectType.picBase64;
    // this.iconPreview = objectType.iconBase64;
    // this.objectTypeForm.controls["category_id"].setValue(objectType.category_id.toString());
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
      header: this.translate.stream('detectors'),
      field: 'detector_id',
      minWidth: 30,
      width: '30px',
      pinned: 'right',
      class:'detector-color',
       formatter: (rowData) => {
        let html =  '<div style="white-space: nowrap;background-color:'+this.gisObjectColors.get(rowData.detector_id)+' ; width: 16px; height: 16px; border-radius: 50%;"></div><span>'+rowData.detector.name+'</span>';
        return this.sanitizer.bypassSecurityTrustHtml(html);
       },
    },
  ];
  ;

}
