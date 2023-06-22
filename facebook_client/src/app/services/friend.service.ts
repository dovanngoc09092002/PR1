import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_server } from '../api';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {}

  getFriends(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/friend/friends `, {
      withCredentials: true,
    });
  }

  sendRequest(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/friend/send `, data, {
      withCredentials: true,
    });
  }

  checkFriendService(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/friend/checkFriend `, data, {
      withCredentials: true,
    });
  }

  getMessUser(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/user/userandmess`, {
      withCredentials: true,
    });
  }

  getMessbyId(id: number): Observable<any> {
    return this.http.get<any>(` ${URL_server}/mess/get?receiverId=${id}`, {
      withCredentials: true,
    });
  }
  getRequestFriends(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/user/userandmess`, {
      withCredentials: true,
    });
  }

  getReqFriends(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/friend/friendrequest`, {
      withCredentials: true,
    });
  }

  searchUser(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/user/search`, data, {
      withCredentials: true,
    });
  }

  //chap nhan loi moi ket ban accept
  acceptFriendAdd(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/friend/accept`, data, {
      withCredentials: true,
    });
  }

  //refuse
  cancelFriendAdd(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/friend/refuse`, data, {
      withCredentials: true,
    });
  }
}
