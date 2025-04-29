import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static apiBaseUrl:string = environment.apiUrl;
  constructor() { }
}
