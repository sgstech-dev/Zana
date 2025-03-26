import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, input, NgZone, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { GisObject, GisObjectService } from 'app/project/services/gis-object.service';
import { Scenario, ScenarioService } from 'app/project/services/scenario.service';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target } from 'app/project/services/target-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gis-object-table',
  standalone: true,
  imports: [
    MtxGridModule
  ],
  templateUrl: './gis-object-table.component.html',
  styleUrl: './gis-object-table.component.scss'
})
export class GisObjectTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() deleteGisObjectLayer = new EventEmitter<number>();
  @Output() flyTo = new EventEmitter<number>();

  @Input({ required: true }) scenario_id: number;
  @Input({ required: true }) isAircraft: boolean;

  @ViewChild('statusTemplate', { static: false }) statusTemplate!: TemplateRef<any>;

  list: GisObject[] = [];
  gisObjectsStatus: Map<number, string> = new Map<number, string>;
  isLoading: boolean = true;
  private readonly translate = inject(TranslateService);
  private scenarioSubscription: Subscription;

  constructor(
    private gisObjectService: GisObjectService,
    private scenarioService: ScenarioService,
    private ngZone: NgZone) { }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.scenarioSubscription) {
      this.scenarioSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    if (this.scenario_id)
      this.updateTable(this.scenario_id);
  }
  ngOnInit(): void {
    this.scenarioSubscription = this.scenarioService.scenarioChange$.subscribe(scenarioId => {
      this.updateTable(scenarioId);
    });
    this.initSignalR();
  }
  initSignalR(): void {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().on("assignTarget", (target: Target, gisObject: GisObject) => {
        this.ngZone.run(() => {
          this.list.forEach(element => {
            if (element.id === gisObject.id) {
              element.status = 'assignTarget';
              this.gisObjectsStatus.set(gisObject.id, "assignTarget");
              this.updateTable(this.scenario_id);
              return true;
            }
          });
        });
      });
    });
  }

  updateTable(scenario_id: number) {
    this.gisObjectService.getByScenarioId(scenario_id).subscribe((result: GisObject[]) => {
      if (this.isAircraft)
        this.list = result.filter(go => go.objectType.category.key === "aircraft");
      else
        this.list = result.filter(go => go.objectType.category.key !== "aircraft");
      this.list.forEach(element => {
        if (this.gisObjectsStatus.has(element.id))
          element.status = this.gisObjectsStatus.get(element.id);
        else
          element.status = "active";
      });
      this.isLoading = false;
    });
  }

  delete(id: number): void {
    this.gisObjectService.delete(id).subscribe({
      next: () => {
        let foundGisObjectIdx = this.list.findIndex((x: { id: number; }) => x.id === id);
        this.list.splice(foundGisObjectIdx, 1);
        this.list = [...this.list];
        this.deleteGisObjectLayer.emit(id);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  edit(gisObject: GisObject): void {
    this.flyTo.emit(gisObject.id);
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
      header: this.translate.stream('name'),
      field: 'name',
      sortable: true,
      minWidth: 100,
      width: '100%',
    },
    {
      header: this.translate.stream('Type'),
      field: 'objectType.name',
      sortable: true,
      minWidth: 100,
      width: '100px',
      hide: true,
    },
    // {
    //   header: this.translate.stream('Category'),
    //   field: 'objectType.category.name',
    //   sortable: true,
    //   minWidth: 100,
    //   width: '100px',
    // },
    {
      header: this.translate.stream('icon'),
      field: 'objectType.iconBase64',
      minWidth: 50,
      type: 'image',
      width: '50px',
    },
    {
      header: this.translate.stream('state'),
      field: 'status',
      //cellTemplate: this.statusTemplate,
      formatter: (rowData) => {
        return rowData.status === 'active'
          ? '<img src="/images/icons/Bullets-green.png" width="24"/>'
          : '<img src="/images/icons/Bullets-red.png" class="blinking-icon" width="24"/>';
      },
      minWidth: 100,
      // type: 'image',
      width: '100px',
    },
    {
      header: this.translate.stream('operation'),
      field: 'operation',
      minWidth: 50,
      width: '50px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'gps_fixed',
          tooltip: this.translate.stream('edit'),
          click: record => this.edit(record),
        },
        // {
        //   type: 'icon',
        //   color: 'warn',
        //   icon: 'delete',
        //   tooltip: this.translate.stream('delete'),
        //   pop: {
        //     title: this.translate.stream('confirm_delete'),
        //     closeText: this.translate.stream('close'),
        //     okText: this.translate.stream('ok'),
        //   },
        //   click: (record: GisObject) => this.delete(record.id),
        // },
      ],
    },
  ]
}
