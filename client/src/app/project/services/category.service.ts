import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  extends BaseHttpClientService{
  apiUrl = ConfigService.apiBaseUrl + "/api/category";
}

export interface Category{
  id:number,
  name:string,
  key:string
}
