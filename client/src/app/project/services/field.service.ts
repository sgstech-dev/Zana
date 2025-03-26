import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { FieldTypes, OwnerType } from '../shared/enums/share-enums.enum';
import { Category } from './category.service';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FieldService extends BaseHttpClientService {
  apiUrl = ConfigService.apiBaseUrl + "/api/field";

  getByCategory(categoryId : number,ownerTypes : OwnerTypes) {
    return this.httpClient.get(this.apiUrl+"/getbycategoryId?categoryId=" + categoryId + "&ownerTypes=" + ownerTypes);
  }
}

export enum OwnerTypes{ObjectType=0,Object=1}

export interface Field {
  id: number,
  name: string,
  caption: string,
  fieldType: FieldTypes,
  showInHUD: boolean,
  category_id:number
  category: Category,
  ownerType: OwnerType,
  listOfValue: string,
  systemCol: boolean,
  unit: string,
  group: string
}

