import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class DrawingUtilityService {

  constructor() { }

  addSemiCircle(map:L.Map, centerLatLng: L.LatLng, minRadius: number, maxRadius: number, startAngle: number, endAngle: number, color: string, fill: boolean = false, stroke: boolean = true) {
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
        for (let angle = (360 - endAngle); angle <= (360 - startAngle); angle += 1) { // Step size = 5 degrees
          let radian = ((angleToAzimuth(angle) - 90) * Math.PI) / 180.0;
  
          // Outer arc (Max radius)
          let outerLatLng = getLastLatLng(latlng.lat * Math.PI / 180.0, latlng.lng * Math.PI / 180.0, radian, maxRadius);
          points.push(outerLatLng);
          // Inner arc (Min radius)
          let InnerLatLng = getLastLatLng(latlng.lat * Math.PI / 180.0, latlng.lng * Math.PI / 180.0, radian, minRadius);
          points.unshift(InnerLatLng);
        }
  
        return points;
      }
  
      function angleToAzimuth(angle) {
        return (450 - angle) % 360;
      }
  
      function metersToPixels(latlng, meters) {
        let point1 = map.latLngToLayerPoint(latlng);
        let destination = L.latLng(latlng.lat, latlng.lng + (meters / getMetersPerPixel(map, latlng)));
        let point2 = map.latLngToLayerPoint(destination);
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
        fill: fill,
        fillOpacity: 0.3,
        weight: 1,
        dashArray: '3',
        opacity: 1.0,
        stroke: stroke
      });
      sc.targetInIds = [];

      let visible = true;
      return sc;
    }
}
