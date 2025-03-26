import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MapAddressSService extends BaseHttpClientService{

  apiUrl = ConfigService.apiBaseUrl + "/api/MapAddress";
}
export interface MapAddress{
  id :number,
  name: string,
  address :string,
  layers :string,
  format :string,
  transparent :boolean,
  type:string,
  minZoomLevel:number,
  maxZoomLevel:number,
  centerLatitude:number,
  centerLongitude :number
}
