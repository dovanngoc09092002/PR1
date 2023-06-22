import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_server } from '../api';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/user/profilebyjwt `, {
      withCredentials: true,
    });
  }

  getProfilebyId(id : any): Observable<any> {
    return this.http.get<any>(` ${URL_server}/user/profile/${id} `, {
      withCredentials: true,
    });
  }

  getPostsByUser(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/post/posts?page=1&limit=5 `, {
      withCredentials: true,
    });
  }

  getNonFriends(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/friend/nonefriends`, {
      withCredentials: true,
    });
  }

  getImages(id: any, idsub: any): Observable<any> {
    return this.http.get<any>(
      ` ${URL_server}/post/getimages/${id}?idsub=${idsub} `,
      {
        withCredentials: true,
      }
    );
  }

  updateUser(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/user/update `, data, {
      withCredentials: true,
    });
  }
}
