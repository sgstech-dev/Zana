import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { GisObject } from './gis-object.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SceneService extends BaseHttpClientService{
  apiUrl = ConfigService.apiBaseUrl + "/api/scene";

  getByGisObjectId(gis_object_id: number) {
    return this.httpClient.get(this.apiUrl + "/GetSceneByGisObject?gis_object_id=" + gis_object_id);
  }
}
export interface Scene {
  id: number,
  latitude: number,
  longitude: number,
  altitude: number,
  heading: number,
  speed: number,
  startTime: number,
  gisObjectId: number,
  gisObject: GisObject | undefined
}
