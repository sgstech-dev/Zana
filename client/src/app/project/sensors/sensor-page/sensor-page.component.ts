import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SignalRService } from 'app/project/services/signal-r.service';
import { Target, TargetType } from 'app/project/services/target-service.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { GisObjectMetaData, GisObjectMetaDataService } from 'app/project/services/gis-object-meta-data.service';
import { GisObject, GisObjectService } from 'app/project/services/gis-object.service';
import { SensorCompenent } from '../sensor-component';
import { firstValueFrom, Subscription } from 'rxjs';
import { ScenarioService } from 'app/project/services/scenario.service';
import { Scene, SceneService } from 'app/project/services/scene.service';

@Component({
  selector: 'app-sensor-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './sensor-page.component.html',
  styleUrl: './sensor-page.component.scss'
})
export default class SensorPageComponent implements AfterViewInit, OnInit, OnDestroy {
  Sensors: GisObject[] = [];
  private sensorComponents: SensorCompenent[] = [];
  private scenarioSubscription: Subscription;
  public currentScenario_id: number;
  @ViewChildren('containers', { read: ViewContainerRef })
  containers!: QueryList<ViewContainerRef>;
  constructor(
    private ngZone: NgZone,
    private gisObjectService: GisObjectService,
    private sceneService: SceneService,
    private scenarioService: ScenarioService,
    private gisObjectMetaDataService: GisObjectMetaDataService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    
  }

  async ngAfterViewInit() {
    this.initSignalR();
    this.scenarioSubscription = this.scenarioService.scenarioChange$.subscribe(async scenarioId => {
      this.changeScenario(scenarioId);
      await this.loadAllSensors();
      this.cdr.detectChanges();
      const containerArray = this.containers.toArray();
      for (let i = 0; i < this.Sensors.length; i++) {
        const sensor = this.Sensors[i];
        const container = containerArray[i];

        await this.loadAndInsertComponent(sensor, container);
      }
    });

    if (ScenarioService.currentScenarioId)
      this.changeScenario(ScenarioService.currentScenarioId);

  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.scenarioSubscription) {
      this.scenarioSubscription.unsubscribe();
    }
  }

  changeScenario(scenario_id: number) {
    this.currentScenario_id = scenario_id;
    SignalRService.getConnection().invoke('changeScenario', Number(this.currentScenario_id));
  }

  private async loadAllSensors(): Promise<void> {
    const gisObjs: any = await firstValueFrom(this.gisObjectService.getByScenarioId(this.currentScenario_id, true));
    const sensors: GisObject[] = [];

    await Promise.all(
      gisObjs.map(async gisObj => {
        const metadatas: any = await firstValueFrom(
          this.gisObjectMetaDataService.getGisObjectMetaDatasByObjectId(gisObj.id,)
        );
        const isSensor = metadatas.some(metadata => metadata.field.name === 'IsSensor' && metadata.value === 'true');
        const rangeContainer = (metadatas as GisObjectMetaData[]).filter(metadata => metadata.field.name == 'endRange')
        let range = 0;
        if (rangeContainer.length > 0)
          range = Number(rangeContainer[0].value);
        if (isSensor) {
          gisObj.range = range;
          sensors.push(gisObj);
        }
      })
    );

    this.Sensors = sensors;
  }

  async loadAndInsertComponent(sensor: any, container: ViewContainerRef) {
    let module;
    switch (sensor.objectType.name) {
      case 'KashefSystem':
        module = await import('../radar-ppi/radar-ppi.component');
        break;
      case 'MonirSystem':
        module = await import('../df-ppi/df-ppi.component');
        break;
      case 'SaherSystem':
        module = await import('../saher-ppi/saher-ppi.component');
        break;
      case 'JaberSystem':
        module = await import('../jaber-ppi/jaber-ppi.component');
        break;
      default:
        console.warn(`Unknown sensor type: ${sensor.objectType.name}`);
        return;
    }

    this.sceneService.getByGisObjectId(sensor.id).subscribe((scenes: Scene[]) => {
      const component = module[Object.keys(module)[0]]; // گرفتن اولین export
      const compRef = container.createComponent(component);
      let sensorComponent = (compRef.instance as SensorCompenent);
      sensorComponent.init(sensor, scenes[0].latitude, scenes[0].longitude, sensor.range, sensor.name);
      this.sensorComponents.push(compRef.instance as SensorCompenent);
    });
  }

  initSignalR() {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('getConnectionId')
        .then((connectionId: string) => {
          console.log("ConnectionId : " + connectionId);
        });
      SignalRService.getConnection().on("sendTarget", (target: Target) => {
        this.sensorComponents.forEach((comp) => {
          comp.updateTargetList(target);
        });
      });
    });
  }
}
