import { AfterViewInit, Component, Input, input, OnInit } from '@angular/core';
import { GisObject } from 'app/project/services/gis-object.service';
import { Target } from 'app/project/services/target-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-operation-template',
  standalone: true,
  imports: [],
  templateUrl: './operation-template.component.html',
  styleUrl: './operation-template.component.scss'
})
export class OperationTemplateComponent implements OnInit, AfterViewInit {

  @Input() gisObject:GisObject;
  @Input() target:Target;
  public map!: L.Map;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map(this.getMapId(), {
      contextmenu: false,
      center: [32.505, 54],
      zoom: 12
    });
    const mapLayer = L.tileLayer("http://localhost/MapData/{z}/{z}_{x}_{y}.png");
    mapLayer.addTo(this.map);
  }
  getMapId(): string {
    return "operationMap_" + this.gisObject.id;
  }
}
