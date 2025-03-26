import { MapAddress, MapAddressSService } from '../../services/map-address-s.service';
import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, ComponentFactoryResolver, inject, OnDestroy, OnInit, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
//map
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-toolbar';
import 'leaflet-switch-basemap';
import 'leaflet.sidepanel';
import 'leaflet.marker.highlight'
import 'leaflet-contextmenu';
import 'leaflet-rotatedmarker';
import 'leaflet-semicircle'
//
import { MatDialog } from '@angular/material/dialog';
import { GisObjectComponent } from '../../scenario/gis-object/gis-object.component';
//import { ObjectType } from '../services/object-type.service';
import { GisObject, GisObjectService } from '../../services/gis-object.service';
import { Scene, SceneService } from '../../services/scene.service';
import { Observable, Subscription } from 'rxjs';
import { GisObjectTableComponent } from "../../scenario/gis-object-table/gis-object-table.component";
import { ScenarioService } from '../../services/scenario.service';
import { SignalRService } from '../../services/signal-r.service';
import { GisObjectMetaData, GisObjectMetaDataService } from '../../services/gis-object-meta-data.service';
import { SettingsService } from '@core';
import { Target } from 'app/project/services/target-service.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GisObjectTableComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export default class MapComponent implements AfterViewInit, OnInit, OnDestroy {
  public map!: L.Map;
  public currentScenario_id: number;
  //public markergroup: Map<string, L.FeatureGroup> = new Map;
  private editableLayers: L.FeatureGroup = new L.FeatureGroup();
  private aircraftLayers: L.FeatureGroup = new L.FeatureGroup();
  //  dialog is a dialog box to show , insert and update GisObject on the map. it contain som property and meta data.
  private dialog = inject(MatDialog);
  private scenarioSubscription: Subscription;
  @ViewChild("gisObjectTable") gisObjectTable: GisObjectTableComponent;
  @ViewChild("aircraftTable") aircraftTable: GisObjectTableComponent;
  private gisObjectZones: Map<number, L.Polygon> = new Map<number, L.Polygon>;
  // constructor
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sceneService: SceneService,
    private gisObjectService: GisObjectService,
    private scenarioService: ScenarioService,
    private gisObjectMetaDataService: GisObjectMetaDataService,
    private mapAddressSService: MapAddressSService,
    private settingsService: SettingsService) {
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.scenarioSubscription) {
      this.scenarioSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.initializeMap();
    this.createBaseMapSwitcher();
    // Subscribe to scenario changes
    this.scenarioSubscription = this.scenarioService.scenarioChange$.subscribe(scenarioId => {
      this.changeScenario(scenarioId);
    });

    if (ScenarioService.currentScenarioId)
      this.changeScenario(ScenarioService.currentScenarioId);
    this.initSignalR();
  }

  ngAfterViewInit(): void {
    this.createLineTools();
  }

  initSignalR() {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('getConnectionId')
        .then((connectionId: string) => {
          console.log("ConnectionId : " + connectionId);
        });
      SignalRService.getConnection().on("sendTarget", (target: Target) => {
        // console.log(targetState);
        let latlng = L.latLng(target.latitude, target.longitude);
        this.aircraftLayers.getLayers().forEach(aircraftMarker => {
          if (aircraftMarker.id === target.systemTargetId) {
            let oldLatLng = aircraftMarker.getLatLng();
            aircraftMarker.setLatLng(latlng);
            aircraftMarker.setRotationAngle(target.heading);
          }
        });
        this.aircraftTable.updateTable(this.currentScenario_id);
        //  console.log(targetState);
      });
      SignalRService.getConnection().on("targetInZone", (targetObjectId: number, gisObjectId: number) => {
        if (!(this.gisObjectZones.get(gisObjectId).targetInIds.find(targetId => targetId == targetObjectId)))
          this.gisObjectZones.get(gisObjectId).targetInIds.push(targetObjectId);
        console.log("isObjectId : " + gisObjectId, this.gisObjectZones.get(gisObjectId).targetInIds);
      });
      SignalRService.getConnection().on("targetOutZone", (targetObjectId: number, gisObjectId: number) => {
        if (this.gisObjectZones.get(gisObjectId).targetInIds.find(targetId => targetId == targetObjectId)) {
          let idx = this.gisObjectZones.get(gisObjectId).targetInIds.findIndex(targetId => targetId == targetObjectId);
          this.gisObjectZones.get(gisObjectId).targetInIds.splice(idx, 1);
        }
        console.log("isObjectId : " + gisObjectId, this.gisObjectZones.get(gisObjectId).targetInIds);
      });
    });
  }

  private initializeMap() {
    this.map = L.map('scenarioMap', {
      contextmenu: true,
      center: [32.505, 54],
      zoom: 7,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });
    this.addSidePanel();
  }

  private addSidePanel() {
    let panelPosition: String;
    if (this.settingsService.options.dir == "rtl")
      panelPosition = "left";
    else
      panelPosition = "right";
    const panelRight = L.control
      .sidepanel('scenarioSidePanel', {
        panelPosition: panelPosition,
        hasTabs: true,
        tabsPosition: 'top',
        pushControls: true,
        darkMode: true,
        defaultTab: 'tab-1',
      })
      .addTo(this.map);
  }

  private createLineTools() {
    var CustomMarker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(16, 16),
        iconSize: new L.Point(32, 32),
        iconUrl: 'images/icons/basic-gunsight.256x256.png'
      }
    });

    this.map.addLayer(this.editableLayers);
    this.map.addLayer(this.aircraftLayers);
    var options = {
      position: 'topright',
      draw: {
        polyline: {
          shapeOptions: {
            color: '#0074e9',
            weight: 3
          }
        },
        polygon: false,
        marker: {
          icon: new CustomMarker()
        },
        rectangle: false,
        circle: false,
        circlemarker: false
      },
      edit: {
        featureGroup: this.editableLayers, //REQUIRED!!
        remove: false
      }
    };

    var drawControl = new L.Control.Draw(options);
    this.map.addControl(drawControl);
    this.handleEvents(drawControl);
  }

  private handleEvents(drawControl: any) {
    let self = this;
    // on Draw Created Layer
    // Close context menu when clicking on the map

    this.map.on(L.Draw.Event.CREATED, function (e) {
      var layer = e.layer;
      layer.type = e.layerType;
      self.openAndSaveMarker(layer);
    });

    this.map.on('draw:edited', function (e) {
      var layers = e.layers;
      layers.eachLayer(function (layer) {
        //do whatever you want; most likely save back to db
        let latlngs: L.latlng[];
        if (layer.type === 'marker') {
          latlngs = [layer.getLatLng()];
        }
        else if (layer.type === 'polyline') {
          latlngs = layer.getLatLngs();
        }
        self.saveMarkerData(latlngs, layer.gisObject).subscribe({
          next: (result: GisObject) => {
            layer.gisObject = result;
            self.aircraftLayers.getLayers().forEach(aircraftMarker => {
              if (aircraftMarker.id === layer.id) {
                aircraftMarker.setLatLng(latlngs[0]);
                aircraftMarker.setRotationAngle(self.bearing(latlngs[0].lat, latlngs[0].lng, latlngs[1].lat, latlngs[1].lng))
              }
            });

          }
        });
      });
    });
  }

  private openAndSaveMarker(layer) {
    this.openAddObjectDlg(layer).subscribe((result: string) => {
      if (result === "") {
        if (layer.gisObject && (layer.gisObject.id === 0)) {
          this.map.removeLayer(layer);
          layer.remove();
        }
        return;
      }
      //drawControl._toolbars.draw.disable();
      let resultObj = JSON.parse(result);
      let gisObject: GisObject = resultObj.gisObject;
      let metadata: Map<number, object> = resultObj.metadata;

      layer.gisObject = gisObject;
      let latlngs: L.latlng[];
      if (layer.type === 'marker') {
        latlngs = [layer.getLatLng()];
      }
      else if (layer.type === 'polyline') {
        if (layer instanceof L.Polyline)
          latlngs = layer.getLatLngs();
      }
      this.saveMarkerData(latlngs, gisObject, metadata).subscribe({
        next: (result: GisObject) => {
          layer.id = result.id;
          layer.gisObject = result;
        },
        complete: () => {
          if (layer.type == "polyline") {
            let marker = L.marker(latlngs[0], {
              rotationAngle: this.bearing(latlngs[0].lat, latlngs[0].lng, latlngs[1].lat, latlngs[1].lng),
              rotationOrigin: 'center center'
            });
            marker.gisObject = layer.gisObject;
            marker.id = layer.gisObject.id;
            this.aircraftLayers.addLayer(marker);
            this.aircraftTable.updateTable(this.currentScenario_id);
            this.setMarkerIcon(marker);
          }
          else
            this.setMarkerIcon(layer);
          this.addPopupToMarker(layer);
          this.setMenuContextToMarker(layer);
          this.editableLayers.addLayer(layer);
          this.gisObjectTable.updateTable(this.currentScenario_id);
        },
        error: () => {
          this.editableLayers.removeLayer(layer);
          layer.remove();
        }
      });

    });
  }

  private setMenuContextToMarker(marker) {
    marker.bindContextMenu({
      contextmenu: true, // Enable context menu
      contextmenuItems: [
        {
          text: 'Edit',
          callback: (e) => {
            this.openAndSaveMarker(e.relatedTarget);
          }
        },
        // {
        //   separator: true // Add a separator
        // },
        {
          text: 'Remove',
          callback: (e) => {
            this.removeGisObject(e.relatedTarget);
          }
        }
      ]
    });
    // // Ensure only one context menu is open at a time
    //   marker.on('contextmenu', () => {
    //     this.closeAllContextMenus();
    //   });
  }

  private removeGisObject(layer) {
    this.gisObjectService.delete(layer.id).subscribe(() => {
      if (layer.gisObject.objectType.category.key == "aircraft") {
        this.aircraftLayers.removeLayer(layer);
        this.editableLayers.getLayers().forEach(gisLayer => {
          if (gisLayer.id === layer.id) {
            this.editableLayers.removeLayer(gisLayer);
            gisLayer.remove();
          }
        });
        this.aircraftTable.updateTable(this.currentScenario_id);
      }
      else {
        this.editableLayers.removeLayer(layer);
        this.gisObjectTable.updateTable(this.currentScenario_id);
      }
      layer.remove();
    });
  }

  private saveMarkerData(latlngs: L.latlng[], gisObject: GisObject, metaData: any = {}): Observable<any> {
    let self = this;
    let speed = 0;
    if (gisObject.objectType.category.key == "aircraft")
      speed = 10;
    //----- save scens data-------
    let saveScens = function (observer, object_id) {
      let scenes: Scene[] = [];
      latlngs.forEach(latlng => {
        let scene: Scene = {
          id: 0,
          latitude: latlng.lat,
          longitude: latlng.lng,
          altitude: 0,
          heading: 0,
          speed: speed,
          startTime: 0,
          gisObjectId: object_id,
          gisObject: undefined
        }
        scenes.push(scene);
      });
      self.sceneService.post(scenes).subscribe({
        next: (result: Scene[]) => {
          observer.next(result);
        },
        error: () => observer.error(),
        complete: () => observer.complete()
      })
    }
    //------save meta data-------
    let saveMetaData = function (observer, object_id) {
      const fields = Object.keys(metaData);
      fields.forEach(field => {
        let a_metadata: GisObjectMetaData = {
          id: 0,
          field_id: Number(field.replace('field_', '')),
          object_id: object_id,
          value: metaData[field],
          field: undefined,
          gisObject: undefined
        }
        self.gisObjectMetaDataService.post(a_metadata).subscribe({
          next: (result: GisObjectMetaData) => {
            observer.next(result);
            observer.complete(); // Signal that the observable is complete
          },
          error: () => observer.error(),
          complete: () => observer.complete()
        });
      });
    }
    //---------------------------

    return new Observable((observer) => {
      let _gisObject: GisObject = {
        id: gisObject.id,
        identityNo: gisObject.identityNo,
        name: gisObject.name,
        scenario_id: gisObject.scenario_id,
        parent_id: gisObject.parent_id,
        objectType_id: gisObject.objectType_id,
        objectType: undefined,
        parent: undefined,
        status:undefined
      }
      if (gisObject.id > 0)  /// edit mode
      {
        this.gisObjectService.put(gisObject.id, _gisObject).subscribe({
          next: (result: GisObject) => {
            observer.next(result);
            saveScens(observer, result.id);
            saveMetaData(observer, result.id);
          },
          error: () => observer.error(),
          complete: () => observer.complete()
        });
      }
      else    /// insert mode
      {
        this.gisObjectService.post(_gisObject).subscribe({
          next: (result: GisObject) => {
            observer.next(result);
            saveScens(observer, result.id);
            saveMetaData(observer, result.id);
          },
          error: () => observer.error(),
          complete: () => observer.complete()
        });
      }
    });
  }

  private setMarkerIcon(marker) {
    var objectIcon = L.icon({
      iconUrl: marker.gisObject.objectType.iconBase64,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    marker.setIcon(objectIcon);
  }

  private addPopupToMarker(marker) {
    const popup = L.popup({ className: 'custom-popup' });
    // const componentRef = this.createComponentInPopup();
    // popup.setContent(componentRef.location.nativeElement);
    marker.bindPopup(marker.gisObject.name);
  }

  private createComponentInPopup() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(GisObjectComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    return componentRef;
  }

  private openAddObjectDlg(layer) {
    const dialogRef = this.dialog.open(GisObjectComponent, {
      data: {
        gisObject: layer.gisObject,
        type: layer.type,
        currentScenario_id: this.currentScenario_id
      }
    });
    return dialogRef.afterClosed();
  }

  // In this method , Base map layers has been created .
  private createBaseMapSwitcher() {
    this.mapAddressSService.get().subscribe((mapAddresses: MapAddress[]) => {
      let baseMaps: object[];
      // eslint-disable-next-line prefer-const
      baseMaps = [];
      mapAddresses.forEach(mapAddress => {
        if (mapAddress.type == "wms") {
          const mapLayer = L.tileLayer.wms(mapAddress.address, {
            minZoom: mapAddress.minZoomLevel, maxZoom: mapAddress.maxZoomLevel,
            layers: mapAddress.layers,   // Replace with the specific WMS layer name
            format: mapAddress.format,
            transparent: mapAddress.transparent,
            version: '1.1.1',
            crs: L.CRS.EPSG3857             // Set the WMS version if needed
          });
          mapLayer.addTo(this.map);
          this.map.panTo([mapAddress.centerLatitude, mapAddress.centerLongitude]);
          baseMaps.push({
            //'http://192.168.80.204:8010/service?'
            layer: mapLayer, //DEFAULT MAP
            icon: '/images/mapThumnails/sat.png',
            name: mapAddress.name
          });
        }
        else {
          const mapLayer = L.tileLayer(mapAddress.address, { minZoom: mapAddress.minZoomLevel, maxZoom: mapAddress.maxZoomLevel });
          mapLayer.addTo(this.map);
          this.map.panTo([mapAddress.centerLatitude, mapAddress.centerLongitude]);
          baseMaps.push({
            //'http://localhost/map/{z}/{z}_{x}_{y}.png'
            layer: mapLayer,//, {
            //   layers: 'sat_Layer',   // Replace with the specific WMS layer name
            //   format: 'image/png',
            //   transparent: true,
            //   version: '1.1.1',
            //   crs: L.CRS.EPSG3857             // Set the WMS version if needed
            // }).addTo(this.map), //DEFAULT MAP
            icon: '/images/mapThumnails/sat.png',
            name: mapAddress.name
          });
        }
      });
      var position: String;
      if (this.settingsService.options.dir == "ltr")
        position = 'bottomleft';
      else
        position = 'bottomright';
      new L.basemapsSwitcher(baseMaps, { position: position }).addTo(this.map);
    });
    // new L.basemapsSwitcher([
    //   {
    //     layer: L.tileLayer.wms('http://192.168.80.204:8010/service?', {
    //       layers: 'sat_Layer',   // Replace with the specific WMS layer name
    //       format: 'image/png',
    //       transparent: true,
    //       version: '1.1.1',
    //       crs: L.CRS.EPSG3857             // Set the WMS version if needed
    //     }).addTo(this.map), //DEFAULT MAP
    //     icon: '/images/mapThumnails/sat.png',
    //     name: 'Satelight'
    //   },
    //   {
    //     layer: L.tileLayer.wms('http://192.168.80.204:8019/service?', {
    //       layers: 'world_dark_Layer',   // Replace with the specific WMS layer name
    //       format: 'image/png',
    //       transparent: true,
    //       version: '1.1.1',
    //       crs: L.CRS.EPSG3857             // Set the WMS version if needed
    //     }),
    //     icon: '/images/mapThumnails/night.png',
    //     name: 'Night Mode'
    //   },
    //   {
    //     layer: L.tileLayer.wms('http://192.168.80.204:8011/service?', {
    //       layers: 'land_Layer',   // Replace with the specific WMS layer name
    //       format: 'image/png',
    //       transparent: true,
    //       version: '1.1.1',
    //       crs: L.CRS.EPSG3857
    //     }),
    //     icon: '/images/mapThumnails/google.png',
    //     name: 'Google landscape'
    //   },
    // ], { position: 'bottomleft' }).addTo(this.map);
  }

  private loadMarkers(scenario_id) {
    this.editableLayers.getLayers().forEach(layer => {
      this.editableLayers.removeLayer(layer);
      layer.remove();
    });
    this.editableLayers.clearLayers();
    this.aircraftLayers.getLayers().forEach(layer => {
      this.aircraftLayers.removeLayer(layer);
      layer.remove();
    });
    this.aircraftLayers.clearLayers();
    this.gisObjectService.getByScenarioId(scenario_id).subscribe((gisObjects: GisObject[]) => {
      gisObjects.forEach(gisObject => {
        this.sceneService.getByGisObjectId(gisObject.id).subscribe((scenes: Scene[]) => {
          let layer;
          if (gisObject.objectType.category.key == "aircraft") {
            let latlngs: L.LatLng[] = [];
            scenes.forEach(scene => {
              latlngs.push([scene.latitude, scene.longitude])
            });
            // create target trajectory ---------------
            layer = L.polyline(latlngs);
            layer.type = "polyline";
            layer.gisObject = gisObject;
            layer.id = gisObject.id;
            // layer.gisObject_id = gisObject.id;
            this.editableLayers.addLayer(layer);
            // create target marker -------------------
            if (scenes.length > 1) {
              let marker = L.marker([scenes[0].latitude, scenes[0].longitude], {
                rotationAngle: this.bearing(scenes[0].latitude, scenes[0].longitude, scenes[1].latitude, scenes[1].longitude),
                rotationOrigin: 'center center'
              });

              marker.gisObject = gisObject;
              marker.id = gisObject.id;
              marker.type = "polyline";
              this.setMarkerIcon(marker);
              this.setMenuContextToMarker(marker);
              this.addPopupToMarker(marker);
              this.aircraftLayers.addLayer(marker);
            }
          }
          else {
            layer = L.marker([scenes[0].latitude, scenes[0].longitude]);
            layer.type = "marker";
            layer.gisObject = gisObject;
            layer.id = gisObject.id;
            // layer.gisObject_id = gisObject.id;
            this.setMarkerIcon(layer);
            this.editableLayers.addLayer(layer);
            this.setMenuContextToMarker(layer);
            this.addPopupToMarker(layer);
            this.getObjectMetaDatas(layer);
          }
        })
      });
    });
  }

  getObjectMetaDatas(gisObjectlayer: L.Marker) {
    let startRange = undefined;
    let endRange = undefined;
    let startAngle = undefined;
    let endAngle = undefined;
    let color = undefined;
    this.gisObjectMetaDataService.getGisObjectMetaDatasByObjectId(gisObjectlayer.gisObject.id).subscribe((gisObjectMetaDatas: GisObjectMetaData[]) => {
      gisObjectMetaDatas.forEach(metadada => {
        if (metadada.field.name == "startRange")
          startRange = Number(metadada.value);
        if (metadada.field.name == "endRange")
          endRange = Number(metadada.value);
        if (metadada.field.name == "startAngle")
          startAngle = parseFloat(metadada.value);
        if (metadada.field.name == "endAngle")
          endAngle = parseFloat(metadada.value);
        if (metadada.field.name == "color")
          color = metadada.value;
      });
      if (startRange !== undefined && endRange !== undefined && startAngle !== undefined && endAngle !== undefined) {
        this.addSemiCircle(gisObjectlayer, startRange, endRange, startAngle, endAngle, color);
      }
    });
  }

  addSemiCircle(gisObjectlayer: L.Marker, minRadius: number, maxRadius: number, startAngle: number, endAngle: number, color: string) {
    let centerLatLng: L.LatLng = gisObjectlayer.getLatLng();
    let self = this;
    function getLastLatLng(φ1, λ1, brng, d) {
      const R = 6371e3; // metres
      const φ2 = Math.asin(Math.sin(φ1) * Math.cos(d / R) +
        Math.cos(φ1) * Math.sin(d / R) * Math.cos(brng));
      const λ2 = λ1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(φ1),
        Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2));
      return new L.LatLng(φ2 * 180 / Math.PI, λ2 * 180 / Math.PI);
    }
    function generateSemiCircle(latlng, minRadius, maxRadius, startAngle, endAngle) {
      var points = [];
      for (let angle = (360 - endAngle); angle <= (360 - startAngle); angle += 5) { // Step size = 5 degrees
        let radian = ((angleToAzimuth(angle) - 90) * Math.PI) / 180;

        // Outer arc (Max radius)
        let outerLatLng = getLastLatLng(latlng.lat * Math.PI / 180, latlng.lng * Math.PI / 180, radian, maxRadius);
        points.push(outerLatLng);
        // Inner arc (Min radius)
        let InnerLatLng = getLastLatLng(latlng.lat * Math.PI / 180, latlng.lng * Math.PI / 180, radian, minRadius);
        points.unshift(InnerLatLng);
      }

      return points;
    }

    function angleToAzimuth(angle) {
      return (450 - angle) % 360;
    }

    function metersToPixels(latlng, meters) {
      let point1 = self.map.latLngToLayerPoint(latlng);
      let destination = L.latLng(latlng.lat, latlng.lng + (meters / getMetersPerPixel(self.map, latlng)));
      let point2 = self.map.latLngToLayerPoint(destination);
      return Math.abs(point2.x - point1.x);
    }

    function getMetersPerPixel(map, latlng) {
      let zoom = map.getZoom();
      let earthCircumference = 40075016.686; // Earth's circumference in meters
      return (earthCircumference * Math.cos(latlng.lat * Math.PI / 180)) / Math.pow(2, zoom + 8);
    }

    let minRadiusInPixle = metersToPixels(centerLatLng, minRadius);
    let maxRadiusInPixle = metersToPixels(centerLatLng, maxRadius);
    var semiCirclePoints = generateSemiCircle(centerLatLng, minRadius, maxRadius, startAngle, endAngle);

    // Draw the semi-circle polygon
    let sc = L.polygon(semiCirclePoints, {
      color: color,
      fillColor: color,
      fillOpacity: 0.3,
      weight: 1
    });
    sc.targetInIds = [];
    this.gisObjectZones.set(gisObjectlayer.gisObject.id, sc);
    this.editableLayers.addLayer(sc);
    let visible = true;
    setInterval(() => {
      visible = !visible;
      if (sc.targetInIds.length > 0) {
        sc.setStyle({
          fillOpacity: visible ? 0.3 : 0.0, // Toggle opacity
          opacity: visible ? 0.3 : 0.0,
          // color: visible ? 'red' : 'yellow' // Change color
        });
      }
      else {
        sc.setStyle({
          fillOpacity: 0.3,
          opacity: 0.3
          // color: visible ? 'red' : 'yellow' // Change color
        });
      }
    }, 400);
  }

  changeScenario(scenario_id: number) {
    this.loadMarkers(scenario_id);
    this.currentScenario_id = scenario_id;
    SignalRService.getConnection().invoke('changeScenario', Number(this.currentScenario_id));
  }

  flyTo(gisObject_id: number) {
    this.editableLayers.getLayers().forEach(layer => {
      if (layer.id) {
        if (layer.id == gisObject_id) {
          layer.enablePermanentHighlight();
          let highlightInterval = setInterval(() => {
            layer.disablePermanentHighlight();
            clearInterval(highlightInterval);
          }, 6000);
          this.map.flyTo(layer.getLatLng());
        }
      }
    });
  }

  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

  // Converts from radians to degrees.
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  bearing(startLat, startLng, destLat, destLng) {
    startLat = this.toRadians(startLat);
    startLng = this.toRadians(startLng);
    destLat = this.toRadians(destLat);
    destLng = this.toRadians(destLng);

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x = Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = this.toDegrees(brng);
    return (brng + 360) % 360;
  }
}
