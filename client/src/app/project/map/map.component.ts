import { Component, OnDestroy, OnInit } from '@angular/core';
import { GisObjectTableComponent } from '../scenario/gis-object-table/gis-object-table.component';
import * as L from 'leaflet';
import 'leaflet.sidepanel';
import 'leaflet-switch-basemap';
import { MapAddress, MapAddressSService } from '../services/map-address-s.service';
import { SettingsService } from '@core';
import { stringify } from 'querystring';
import { GisObject, GisObjectService } from '../services/gis-object.service';
import { Scene, SceneService } from '../services/scene.service';
import { GisObjectMetaData, GisObjectMetaDataService } from '../services/gis-object-meta-data.service';
import { SignalRService } from '../services/signal-r.service';
import { ScenarioService } from '../services/scenario.service';
import { Subscription } from 'rxjs';
import { Target } from '../services/target-service.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GisObjectTableComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export default class MapComponent implements OnInit, OnDestroy {
  public map!: L.Map;
  public currentScenario_id: number;
  private gisObjectLayers: L.FeatureGroup = new L.FeatureGroup();
  private targetLayers: L.FeatureGroup = new L.FeatureGroup();
  private gisObjectZones: Map<number, L.Polygon> = new Map<number, L.Polygon>;
  private scenarioSubscription: Subscription;
  private targets: Map<string, L.Marker> = new Map<string, L.Marker>;

  constructor(
    private mapAddressSService: MapAddressSService,
    private settingsService: SettingsService,
    private gisObjectService: GisObjectService,
    private sceneService: SceneService,
    private scenarioService: ScenarioService,
    private gisObjectMetaDataService: GisObjectMetaDataService,) { }

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
    this.scenarioSubscription = this.scenarioService.scenarioChange$.subscribe(scenarioId => {
      this.changeScenario(scenarioId);
    });

    if (ScenarioService.currentScenarioId)
      this.changeScenario(ScenarioService.currentScenarioId);
    this.initSignalR();
  }

  initSignalR() {
    SignalRService.startConnection().then(() => {
      SignalRService.getConnection().invoke('getConnectionId')
        .then((connectionId: string) => {
          console.log("ConnectionId : " + connectionId);
        });
      SignalRService.getConnection().on("sendTarget", (target: Target) => {
        let latlng = L.latLng(target.latitude, target.longitude);
        if (this.targets.has(target.targetId)) {
          let aTarget = this.targets.get(target.targetId);
          aTarget.setLatLng(latlng);
          aTarget.targetMarker.setRotationAngle(target.heading);
        }
        else {
          this.targets.set(target.targetId, this.createTarget(latlng.lat, latlng.lng));
        }
        //this.aircraftTable.updateTable(this.currentScenario_id);
        //  console.log(targetState);
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
            layer: mapLayer,
            icon: '/images/mapThumnails/sat.png',
            name: mapAddress.name
          });
        }
        else {
          const mapLayer = L.tileLayer(mapAddress.address, { minZoom: mapAddress.minZoomLevel, maxZoom: mapAddress.maxZoomLevel });
          mapLayer.addTo(this.map);
          this.map.panTo([mapAddress.centerLatitude, mapAddress.centerLongitude]);
          baseMaps.push({
            layer: mapLayer,
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
            layer = L.circleMarker([scenes[0].latitude, scenes[0].longitude],{radius:3,fillOpacity:1.0});
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
        gisObjectlayer.setStyle({fillColor : color , color:color});
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
      fill:false,
     // fillOpacity: 0.3,
      weight: 4,
      dashArray:'5,10',
      opacity:1.0
    });
    sc.targetInIds = [];
    this.gisObjectZones.set(gisObjectlayer.gisObject.id, sc);
    this.gisObjectLayers.addLayer(sc);
    let visible = true;
    // setInterval(() => {
    //   visible = !visible;
    //   if (sc.targetInIds.length > 0) {
    //     sc.setStyle({
    //       fillOpacity: visible ? 0.3 : 0.0, // Toggle opacity
    //       opacity: visible ? 0.3 : 0.0,
    //       // color: visible ? 'red' : 'yellow' // Change color
    //     });
    //   }
    //   else {
    //     sc.setStyle({
    //       fillOpacity: 0.3,
    //       opacity: 0.3
    //       // color: visible ? 'red' : 'yellow' // Change color
    //     });
    //   }
    // }, 400);
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

}
