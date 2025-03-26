import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Guid } from "guid-typescript";
import { ObjectType } from './object-type.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class GisObjectService extends BaseHttpClientService{

  apiUrl = ConfigService.apiBaseUrl + "/api/gisObject";

  getByScenarioId(scenario_id:number){
    return this.httpClient.get(this.apiUrl + "/GetGisObjectByScenario_id?scenario_id="+scenario_id);
  }
}
export interface GisObject {
  id: number,
  identityNo: string,
  name: string,
  scenario_id: number,
  parent_id: number,
  parent:GisObject | undefined
  objectType_id: number,
  objectType: ObjectType,
  status:string|undefined
}
