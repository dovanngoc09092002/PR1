import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_server } from '../api';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}
  //hàm register
  register(data: any): Observable<any> {
    return this.http.post<any>(` ${URL_server}/user/register `, data);
  }
  // hàm login
  login(data: any): Observable<any> {
    return this.http.post<any>(`${URL_server}/user/login`, data);
  }
  //check login
  checkLogin(): boolean {
    if (!this.cookieService.get('token')) {
      return false;
    } else {
      return true;
    }
  }

  logoutService(): Observable<any> {
    return this.http.get<any>(`${URL_server}/user/logout`, {
      withCredentials: true,
    });
  }

  //change password
  changePass(data : object): Observable<any> {
    return this.http.post<any>(`${URL_server}/user/changePassword`,data , {
      withCredentials: true,
    });
  }
}
