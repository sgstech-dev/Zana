import { Injectable } from '@angular/core';
import { Field } from './field.service';
import { GisObject } from './gis-object.service';
import { ConfigService } from './config.service';
import { HttpClient } from '@microsoft/signalr';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class GisObjectMetaDataService extends BaseHttpClientService {
  apiUrl = ConfigService.apiBaseUrl + "/api/gisObjectMetaData";
  getGisObjectMetaDatasByObjectId(object_id:number){
    return this.httpClient.get(this.apiUrl + "/GetGisObjectMetaDatasByObjectId?objectId="+object_id);
  }
}
export interface GisObjectMetaData {
  id: number,
  field_id: number,
  field: Field,
  object_id: number,
  gisObject: GisObject,
  value: string
}
