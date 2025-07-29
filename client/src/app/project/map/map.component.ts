import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GisObjectTableComponent } from '../scenario/gis-object-table/gis-object-table.component';
import * as L from 'leaflet';
import 'leaflet.sidepanel';
import 'leaflet-switch-basemap';
import 'leaflet-ruler';
import 'leaflet.mousecoordinate/dist/leaflet.mousecoordinate.js';

// declare let require: any;
// require('leaflet.sidepanel');
// require('leaflet-switch-basemap');
import { MapAddress, MapAddressSService } from '../services/map-address-s.service';
import { SettingsService } from '@core';
import { stringify } from 'querystring';
import { GisObject, GisObjectService } from '../services/gis-object.service';
import { Scene, SceneService } from '../services/scene.service';
import { GisObjectMetaData, GisObjectMetaDataService } from '../services/gis-object-meta-data.service';
import { SignalRService } from '../services/signal-r.service';
import { ScenarioService } from '../services/scenario.service';
import { Subscription } from 'rxjs';
import { Target, TargetType } from '../services/target-service.service';
import { PpiUtilityService } from '../services/ppi-utility.service';
import { DrawingUtilityService } from '../services/drawing-utility.service';
import { TargetTableComponent } from "../scenario/target-table/target-table.component";

export interface MapLayerInfo {
  layer: string,
  title: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GisObjectTableComponent, TargetTableComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

export default class MapComponent implements OnInit, OnDestroy {
  public map!: L.Map;
  public currentScenario_id: number;
  public gisObjectLayers: L.FeatureGroup = new L.FeatureGroup();

  private targetLayers: L.FeatureGroup = new L.FeatureGroup();
  private gisObjectZones: Map<number, L.Polygon> = new Map<number, L.Polygon>;
  private scenarioSubscription: Subscription;
  private targets: Map<string, L.Marker> = new Map<string, L.Marker>;
  private mapLayers: L.Control.Layers;
  private overlayMaps = {};

  @ViewChild('aircraftTable') aircraftTable: TargetTableComponent;

  constructor(
    private mapAddressSService: MapAddressSService,
    private settingsService: SettingsService,
    private gisObjectService: GisObjectService,
    private sceneService: SceneService,
    private scenarioService: ScenarioService,
    private gisObjectMetaDataService: GisObjectMetaDataService,
    private ppiUtilityService: PpiUtilityService,
    private drawingUtilityService: DrawingUtilityService
  ) { }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.scenarioSubscription) {
      this.scenarioSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.initializeMap();
    this.createBaseMapSwitcher();
    this.map.addLayer(this.gisObjectLayers);
    this.map.addLayer(this.targetLayers);
    let self = this;
    this.map.on("basemapChange", function (e) {
      let mapLayersInfo: MapLayerInfo[] = [];
      mapLayersInfo = self.getMapLayersInfo(e.layer.layers);
      self.switchBaseMap(e.layer._url, mapLayersInfo);
    });
    this.scenarioSubscription = this.scenarioService.scenarioChange$.subscribe(scenarioId => {
      this.changeScenario(scenarioId);
    });

    if (ScenarioService.currentScenarioId)
      this.changeScenario(ScenarioService.currentScenarioId);
    this.initSignalR();
    var options: {
      position: 'bottomright',         // Leaflet control position option
      circleMarker: {               // Leaflet circle marker options for points used in this plugin
        color: 'red',
        radius: 2
      },
      lineStyle: {                  // Leaflet polyline options for lines used in this plugin
        color: 'red',
        dashArray: '1,6'
      },
      lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
        display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
        decimal: 2,                 // Distance result will be fixed to this value. 
        factor: null,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
        label: 'Distance:'           
      },
      angleUnit: {
        display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
        decimal: 2,                 // Bearing result will be fixed to this value.
        factor: null,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
        label: 'Bearing:'
      }
    }
    L.control.ruler(options).addTo(this.map);
    L.control.mouseCoordinate({gpsLong: true, utm:true,utmref:true,gps: true,position:"bottomright"}).addTo(this.map);
  }

  initSignalR() {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('getConnectionId')
        .then((connectionId: string) => {
          console.log("ConnectionId : " + connectionId);
        });
      SignalRService.getConnection().on("sendTarget", (target: Target) => {
        if (target.targetType == TargetType.Position) {
          let latlng = L.latLng(target.latitude, target.longitude);
          if (this.targets.has(target.targetId)) {
            let aTarget = this.targets.get(target.targetId);
            aTarget.setLatLng(latlng);
            aTarget.targetMarker.setRotationAngle(target.heading);
          }
          else {
            this.targets.set(target.targetId, this.createTarget(latlng.lat, latlng.lng));
          }
        }
        if (target.targetType == TargetType.Direction) {
          this.gisObjectLayers.getLayers().forEach(layer => {
            if (layer.id == target.detector_id) {
              this.addDirection(layer, target.theta, layer.endRange, 'red', layer.color);
            }
          });
        }
      });
    });
  }

  private createTarget(lat: number, lng: number): L.Marker {
    let layer = L.marker([lat, lng]);
    layer.type = "target";
    this.setTargetIcon(layer);
    this.targetLayers.addLayer(layer);
    return layer;
  }

  private setTargetIcon(marker) {
    var objectIcon = L.icon({
      iconUrl: "/images/icons/target.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    marker.setIcon(objectIcon);
  }

  private initializeMap() {
    this.map = L.map('map', {
      contextmenu: true,
      center: [32.505, 54],
      zoom: 7,
      attributionControl: false,
      zoomSnap: 0.1
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
      .sidepanel('MapSidePanel', {
        panelPosition: panelPosition,
        hasTabs: true,
        tabsPosition: 'top',
        pushControls: true,
        darkMode: true,
        defaultTab: 'tab-1',
      })
      .addTo(this.map);
  }

  // In this method , Base map layers has been created .
  private createBaseMapSwitcher() {
    this.mapAddressSService.get().subscribe((mapAddresses: MapAddress[]) => {
      let baseMaps: any[];
      baseMaps = [];
      mapAddresses.forEach(mapAddress => {
        if (mapAddress.type == "wms") {
          const mapLayer = L.tileLayer.wms(mapAddress.address, {
            minZoom: mapAddress.minZoomLevel, maxZoom: mapAddress.maxZoomLevel,
            layers: mapAddress.baseLayers,   // Replace with the specific WMS layer name
            format: mapAddress.format,
            transparent: mapAddress.transparent,
            version: '1.1.1',
            crs: L.CRS.EPSG3857             // Set the WMS version if needed
          });
          //mapLayer.addTo(this.map);
          mapLayer.layers = mapAddress.layers;
          mapLayer.address = mapAddress.address;
          mapLayer.centerLatitude = mapAddress.centerLatitude;
          mapLayer.centerLongitude = mapAddress.centerLongitude;
          //this.map.panTo([mapAddress.centerLatitude, mapAddress.centerLongitude]);
          baseMaps.push({
            layer: mapLayer,
            icon: '/images/mapThumnails/sat.png',
            name: mapAddress.name
          });
        }
        else {
          const mapLayer = L.tileLayer(mapAddress.address, { minZoom: mapAddress.minZoomLevel, maxZoom: mapAddress.maxZoomLevel });
          //mapLayer.addTo(this.map);
          //this.map.panTo([mapAddress.centerLatitude, mapAddress.centerLongitude]);
          baseMaps.push({
            layer: mapLayer,
            icon: '/images/mapThumnails/sat.png',
            name: mapAddress.name
          });
        }
      });
      baseMaps[0].layer.addTo(this.map);
      this.switchBaseMap(baseMaps[0].layer.address, this.getMapLayersInfo(baseMaps[0].layer.layers))
      this.map.panTo([baseMaps[0].layer.centerLatitude, baseMaps[0].layer.centerLongitude]);
      var position: String;
      if (this.settingsService.options.dir == "ltr")
        position = 'bottomleft';
      else
        position = 'bottomright';
      let switcher = new L.basemapsSwitcher(baseMaps, { position: position });
      switcher.addTo(this.map);
    });
  }

  private getMapLayersInfo(strLayers: string) {
    let result: MapLayerInfo[] = [];
    strLayers.split(',').forEach(element => {
      let tmpInfo: MapLayerInfo = {
        layer: '',
        title: ''
      };
      tmpInfo.layer = element.split(':')[0];
      tmpInfo.title = element.split(':')[1];
      result.push(tmpInfo);
      return true;
    });
    return result;
  }

  private switchBaseMap(mapUrl: string, layers: MapLayerInfo[]) {
    if (!layers) {
      return;
    }
    Object.values(this.overlayMaps).forEach(layer => {
      if (this.map.hasLayer(layer)) {
        this.map.removeLayer(layer);
      }
      this.mapLayers.removeLayer(layer);
    });
    this.overlayMaps = {};
    layers.forEach(element => {
      var wmsLayer = L.tileLayer.wms(mapUrl, {
        layers: element.layer,
        format: 'image/png',
        transparent: true,
      });
      this.overlayMaps["\"" + element.title + "\""] = wmsLayer;
    });
    if (this.mapLayers) {
      this.map.removeLayer(this.mapLayers);
      this.mapLayers.remove()
      this.mapLayers = undefined;
    }
    this.mapLayers = L.control.layers(null, this.overlayMaps, { autoZIndex: false }).addTo(this.map);
  }

  private loadMarkers(scenario_id) {
    this.gisObjectLayers.getLayers().forEach(layer => {
      this.gisObjectLayers.removeLayer(layer);
      layer.remove();
    });
    this.gisObjectLayers.clearLayers();

    this.gisObjectService.getByScenarioId(scenario_id).subscribe((gisObjects: GisObject[]) => {
      gisObjects.forEach(gisObject => {
        this.sceneService.getByGisObjectId(gisObject.id).subscribe((scenes: Scene[]) => {
          let layer;
          if (gisObject.objectType.category.key !== "aircraft") {
            layer = L.circleMarker([scenes[0].latitude, scenes[0].longitude], { radius: 3, fillOpacity: 1.0 });
            layer.type = "marker";
            layer.gisObject = gisObject;
            layer.id = gisObject.id;
            // this.setMarkerIcon(layer);
            this.gisObjectLayers.addLayer(layer);
            //this.setMenuContextToMarker(layer);
            this.addPopupToMarker(layer);
            this.getObjectMetaDatas(layer);
          }
        })
      });
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
    marker.bindPopup(marker.gisObject.name);
  }

  getObjectMetaDatas(gisObjectlayer: L.CircleMarker) {
    let startRange = undefined;
    let endRange = undefined;
    let startAngle = undefined;
    let endAngle = undefined;
    let color = undefined;
    let threshold: number = undefined;

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
        if (metadada.field.name == "Threshold")
          threshold = Number(metadada.value);
      });
      gisObjectlayer.threshold = threshold;
      gisObjectlayer.endRange = endRange;
      gisObjectlayer.color = color;
      this.aircraftTable.setGisObjectColors(gisObjectlayer.gisObject.id, color);
      if (startRange !== undefined && endRange !== undefined && startAngle !== undefined && endAngle !== undefined) {
        gisObjectlayer.setStyle({ fillColor: color, color: color });
        let sc = this.drawingUtilityService.addSemiCircle(this.map, gisObjectlayer.getLatLng(), startRange, endRange, startAngle, endAngle, color);
        this.gisObjectZones.set(gisObjectlayer.gisObject.id, sc);
        this.gisObjectLayers.addLayer(sc);
      }
    });
  }

  changeScenario(scenario_id: number) {
    this.loadMarkers(scenario_id);
    this.currentScenario_id = scenario_id;
    SignalRService.getConnection().invoke('changeScenario', Number(this.currentScenario_id));
  }

  flyTo(gisObject_id: number) {
    this.gisObjectLayers.getLayers().forEach(layer => {
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

  private addDirection(gisObjectlayer: L.Marker, theta: number, range: number, color: any, thresholdColor: any = "#00000000") {
    let centerLatLng: L.LatLng = gisObjectlayer.getLatLng();

    this.ppiUtilityService.drawFadingLine(this.map, centerLatLng, range, theta, color, 3, thresholdColor);
  }

  private drawFadingLine(gisObjectlayer: L.Marker, lat: number, lng: number, color: any, theta: number, threshold: number, range: number) {
    // Create a circle with full opacity
    let centerLatLng: L.LatLng = gisObjectlayer.getLatLng();
    let sc = this.drawingUtilityService.addSemiCircle(this.map, gisObjectlayer.getLatLng(), 0, range, theta - threshold, theta + threshold, gisObjectlayer.color, true, false);

    let line = L.polyline([[lat, lng], [centerLatLng.lat, centerLatLng.lng]], {
      color: color,    // Border color
      fillColor: color, // Fill color
      fillOpacity: 1,   // Initially fully visible
      weight: 2
    }).addTo(this.map);

    let opacity = 1;
    let fadeInterval = setInterval(() => {
      opacity -= 0.01; // Reduce opacity gradually
      line.setStyle({ fillOpacity: Math.max(opacity, 0), opacity: Math.max(opacity, 0) });
      sc.setStyle({ fillOpacity: Math.max(opacity, 0), opacity: Math.max(opacity, 0) });
      if (opacity <= 0) {
        clearInterval(fadeInterval); // Stop fading
        this.map.removeLayer(line); // Remove from map
        this.map.removeLayer(sc); // Remove from map
      }
    }, 50); // Reduce opacity every 500ms (total 5s)
  }
}
