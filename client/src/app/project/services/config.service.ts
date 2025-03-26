import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static apiBaseUrl:string = "http://localhost:5026";
  constructor() { }
}
