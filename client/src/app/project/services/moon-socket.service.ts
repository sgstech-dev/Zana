import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MoonSocketService extends BaseHttpClientService {
  apiUrl = ConfigService.apiBaseUrl ;
  saher_TurnOn_Off(jammerName: string) {
    return this.httpClient.get(this.apiUrl + "/saher_TurnOn_Off?JammerName=" + jammerName);
  }
}
