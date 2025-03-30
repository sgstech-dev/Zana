import { AfterViewInit, Component, OnInit } from '@angular/core';
import { randomUUID, UUID } from 'crypto';
import * as L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-radar-ppi',
  standalone: true,
  imports: [],
  templateUrl: './radar-ppi.component.html',
  styleUrl: './radar-ppi.component.scss'
})
export class RadarPPIComponent implements OnInit, AfterViewInit {
  mapId: UUID = uuidv4();
  center: L.LatLng;
  private map: L.Map;

  constructor() { }
  ngAfterViewInit(): void {
    this.center = L.latLng(32.505, 54);
    this.initializeMap();
    this.drawPPIAxis(800000);
    this.drawFadingCircle(32,54.1);
    this.drawFadingCircle(30.5,57.8);
  }
  ngOnInit(): void {

  }
  private initializeMap() {
    this.map = L.map(this.mapId, {
      contextmenu: true,
      center: this.center,
      zoom: 7,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      zoomControl: false,
      attributionControl: false,
      dragging: false, // Disable panning
      scrollWheelZoom: false, // Disable zooming with the scroll wheel
      doubleClickZoom: false, // Disable zooming on double click
      touchZoom: false,
    });
  }
  private drawPPIAxis(radius: number) {
    let color = 'gray';
    let circle = L.circle(this.center, {
      radius: radius, // meters
      color: color,
      weight: 0.5,
      fill: false,
    }).addTo(this.map);

    L.circle(this.center, {
      radius: radius * 2 / 3, // meters
      color: color,
      weight: 0.5,
      fill: false,
    }).addTo(this.map);

    L.circle(this.center, {
      radius: radius / 3, // meters
      color: color,
      weight: 0.5,
      fill: false,
    }).addTo(this.map);

    let crossLine = this.drawCrossLine(radius + radius / 10, color);
    crossLine.addTo(this.map);
    // Calculate bounds based on circle radius
    let bounds = circle.getBounds();
    // Fit the map to the circle bounds
    this.map.fitBounds(bounds);
  }

  private destinationPoint(lat, lng, distance, bearing) {
    const a = 6378137.0; // Semi-major axis (meters)
    const f = 1 / 298.257223563; // Flattening
    const b = a * (1 - f); // Semi-minor axis

    const sinAlpha1 = Math.sin(bearing * Math.PI / 180);
    const cosAlpha1 = Math.cos(bearing * Math.PI / 180);
    const tanU1 = (1 - f) * Math.tan(lat * Math.PI / 180);
    const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
    const sinU1 = tanU1 * cosU1;

    let sigma1 = Math.atan2(tanU1, cosAlpha1);
    let sinAlpha = cosU1 * sinAlpha1;
    let cosSqAlpha = 1 - sinAlpha * sinAlpha;
    let uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    let A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    let B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

    let sigma = distance / (b * A);
    let sigmaP, sinSigma, cosSigma, cos2SigmaM;
    do {
      sigmaP = sigma;
      sinSigma = Math.sin(sigma);
      cosSigma = Math.cos(sigma);
      cos2SigmaM = Math.cos(2 * sigma1 + sigma);
      sigma = distance / (b * A) + B * sinSigma * (cos2SigmaM + (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
          (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(sigma - sigmaP) > 1e-12);

    let tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
    let lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1, (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
    let lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
    let C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    let L = lambda - (1 - C) * f * sinAlpha *
      (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));

    let lng2 = (lng * Math.PI / 180 + L) * 180 / Math.PI;
    return [lat2 * 180 / Math.PI, lng2];
  }

  private drawCrossLine(radius: number, color) {
    // Compute endpoints for "+" cross
    const pointN = this.destinationPoint(this.center.lat, this.center.lng, radius, 0);   // North (0°)
    const pointS = this.destinationPoint(this.center.lat, this.center.lng, radius, 180); // South (180°)
    const pointE = this.destinationPoint(this.center.lat, this.center.lng, radius, 90);  // East (90°)
    const pointW = this.destinationPoint(this.center.lat, this.center.lng, radius, 270); // West (270°)

    // Compute endpoints for "X" cross
    const pointNE = this.destinationPoint(this.center.lat, this.center.lng, radius, 45);   // NE (45°)
    const pointSW = this.destinationPoint(this.center.lat, this.center.lng, radius, 225); // SW (225°)
    const pointNW = this.destinationPoint(this.center.lat, this.center.lng, radius, 315); // NW (315°)
    const pointSE = this.destinationPoint(this.center.lat, this.center.lng, radius, 135); // SE (135°)

    return L.polyline([
      [pointN, pointS],
      [pointE, pointW],
      [pointNE, pointSW],
      [pointNW, pointSE]],
      { color: color, weight: 0.5 });
  }

  drawFadingCircle(lat, lng, radius = 5) {
    // Create a circle with full opacity
    let circle = L.circle([lat, lng], {
        radius: radius,  // Radius in meters
        color: "red",    // Border color
        fillColor: "red", // Fill color
        fillOpacity: 1   // Initially fully visible
    }).addTo(this.map);

    let opacity = 1;
    let fadeInterval = setInterval(() => {
        opacity -= 0.01; // Reduce opacity gradually
        circle.setStyle({ fillOpacity: Math.max(opacity, 0) , opacity: Math.max(opacity, 0)});

        if (opacity <= 0) {
            clearInterval(fadeInterval); // Stop fading
            this.map.removeLayer(circle); // Remove from map
        }
    }, 50); // Reduce opacity every 500ms (total 5s)
}
}
