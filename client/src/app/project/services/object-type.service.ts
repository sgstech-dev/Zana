import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectTypeService extends BaseHttpClientService{
  apiUrl = ConfigService.apiBaseUrl + "/api/objectType";
}
export interface ObjectType {
  id: number,
  name: string,
  category_id: number,
  category: Category,
  picBase64: string,
  iconBase64:string,
  modelBase64:string
}

