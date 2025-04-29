import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { ConfigService } from 'app/project/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);

  private apiUrl: string = ConfigService.apiBaseUrl + "/api/User";

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>(this.apiUrl + '/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>(this.apiUrl + '/refresh', params);
  }

  logout(params: Record<string, any>) {
    return this.http.post<any>(this.apiUrl + '/logout', params);
  }

  me(params: Record<string, any>) {
    return this.http.post<User>(this.apiUrl + '/me', params);
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>(this.apiUrl + '/menu').pipe(map(res => res.menu));
  }
}
