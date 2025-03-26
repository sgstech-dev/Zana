import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationStringService extends BaseHttpClientService{
  apiUrl = ConfigService.apiBaseUrl + "/api/LocalizationString";
}

export interface LocalizationString {
  strId: number,
  strKey: string,
  strValue: string,
  lang: string
}
