import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MoonSocketService extends BaseHttpClientService {
  apiUrl = ConfigService.apiBaseUrl ;
  //Call from Saher
  saher_TurnOn_Off(jammerName: string) {
    return this.httpClient.get(this.apiUrl + "/saher_TurnOn_Off?JammerName=" + jammerName);
  }
  saherStatusRequest() {
    return this.httpClient.get(this.apiUrl + "/saherStatusRequest?");
  }
  //Call from Jaber
  takingPossession(serialNumber:string, lat:number,lng:number,order:string){
    return this.httpClient.post(this.apiUrl + "/takingPossession?serialNumber="+serialNumber+"&lat="+lat+"&lng="+lng+"&order="+order,{});
  }
  //Call from JammerGonbadi
  jammerGonbadiOnOff(chanelNumber:string,state:string){
    return this.httpClient.post(this.apiUrl + "/jammerGonbadiOnOff?chanelNumber="+chanelNumber+"&state="+state,{});
  }
}
