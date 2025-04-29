import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { DrawingUtilityService } from './drawing-utility.service';

@Injectable({
  providedIn: 'root'
})
export class PpiUtilityService {

  constructor(
    private drawingUtilityService:DrawingUtilityService
  ) { }

  public drawPPIAxis(map: L.Map, center: L.LatLng, radius: number) {
    let color = 'gray';
    let circle = L.circle(center, {
      radius: radius, // meters
      color: color,
      weight: 0.5,
      fill: false,
    }).addTo(map);

    L.circle(center, {
      radius: radius * 2 / 3, // meters
      color: color,
      weight: 0.5,
      fill: false,
    }).addTo(map);

    L.circle(center, {
      radius: radius / 3, // meters
      color: color,
      weight: 0.5,
      fill: false,
    }).addTo(map);

    let crossLine = this.drawCrossLine(center, radius + radius / 10, color);
    crossLine.addTo(map);
    // Calculate bounds based on circle radius
    let bounds = circle.getBounds();
    // Fit the map to the circle bounds
    map.fitBounds(bounds);
  }

  private drawCrossLine(center: L.LatLng, radius: number, color) {
    // Compute endpoints for "+" cross
    const pointN = this.destinationPoint(center.lat, center.lng, radius, 0);   // North (0°)
    const pointS = this.destinationPoint(center.lat, center.lng, radius, 180); // South (180°)
    const pointE = this.destinationPoint(center.lat, center.lng, radius, 88.5);  // East (90°)
    const pointW = this.destinationPoint(center.lat, center.lng, radius, 271.5); // West (270°)

    // Compute endpoints for "X" cross
    const pointNE = this.destinationPoint(center.lat, center.lng, radius, 45);   // NE (45°)
    const pointSW = this.destinationPoint(center.lat, center.lng, radius, 225); // SW (225°)
    const pointNW = this.destinationPoint(center.lat, center.lng, radius, 315); // NW (315°)
    const pointSE = this.destinationPoint(center.lat, center.lng, radius, 135); // SE (135°)

    return L.polyline([
      [pointN, center],
      [pointS, center],
      [pointE, center],
      [pointW, center],
      [pointNE, center],
      [pointSW, center],
      [pointNW, center],
      [pointSE, center]],
      { color: color, weight: 0.5 });
  }

  private destinationPoint(lat, lng, distance, bearing) {
    const R = 6371e3; // metres
    lat = lat * Math.PI / 180;
    lng = lng * Math.PI / 180;
    bearing = bearing * Math.PI / 180;
    const φ2 = Math.asin(Math.sin(lat) * Math.cos(distance / R) +
      Math.cos(lat) * Math.sin(distance / R) * Math.cos(bearing));
    const λ2 = lng + Math.atan2(Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat),
      Math.cos(distance / R) - Math.sin(lat) * Math.sin(φ2));
    return [φ2 * 180 / Math.PI, λ2 * 180 / Math.PI];
  }

  public drawFadingCircle(map: L.Map, lat, lng, radius = 5) {
    // Create a circle with full opacity
    let circle = L.circle([lat, lng], {
      radius: radius,  // Radius in meters
      color: "red",    // Border color
      fillColor: "red", // Fill color
      fillOpacity: 1   // Initially fully visible
    }).addTo(map);

    let opacity = 1;
    let fadeInterval = setInterval(() => {
      opacity -= 0.01; // Reduce opacity gradually
      circle.setStyle({ fillOpacity: Math.max(opacity, 0), opacity: Math.max(opacity, 0) });

      if (opacity <= 0) {
        clearInterval(fadeInterval); // Stop fading
        map.removeLayer(circle); // Remove from map
      }
    }, 50); // Reduce opacity every 500ms (total 5s)
  }

  public drawFadingLine(map: L.Map, center: L.LatLng, range: number, theta: number, color: string,threshold:number=0,thresholdColor:any="#00000000") {
    const point = this.destinationPoint(center.lat, center.lng, range, theta);
    // Create a circle with full opacity
    let sc = this.drawingUtilityService.addSemiCircle(map,center, 0, range, theta - threshold, theta + threshold, thresholdColor, true, false);
    let line = L.polyline([point, [center.lat, center.lng]], {
      color: color,    // Border color
      fillColor: color, // Fill color
      fillOpacity: 1,   // Initially fully visible
      weight: 2
    });
    sc.addTo(map);
    line.addTo(map);

    let opacity = 1;
    let fadeInterval = setInterval(() => {
      opacity -= 0.01; // Reduce opacity gradually
      line.setStyle({ fillOpacity: Math.max(opacity, 0), opacity: Math.max(opacity, 0) });
      sc.setStyle({ fillOpacity: Math.max(opacity, 0), opacity: Math.max(opacity, 0) });
      if (opacity <= 0) {
        clearInterval(fadeInterval); // Stop fading
        map.removeLayer(line); // Remove from map
        map.removeLayer(sc); // Remove from map
      }
    }, 50); // Reduce opacity every 500ms (total 5s)
  }
}
