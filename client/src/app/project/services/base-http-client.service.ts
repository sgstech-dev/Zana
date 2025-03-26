import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpClientService {
  protected apiUrl: string;
  constructor(protected httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(this.apiUrl);
  }

  post(object: any) {
    return this.httpClient.post(this.apiUrl, object);
  }

  put(id: number, object: any) {
    return this.httpClient.put(this.apiUrl + "/" + id, object);
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }
}
