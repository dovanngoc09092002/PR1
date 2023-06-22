import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_server } from '../api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/video/get?page=1&limit=9999`, {
      withCredentials: true,
    });
  }

  createVideo(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/video/create`, data, {
      withCredentials: true,
    });
  }

  getVideoByUserId(): Observable<any> {
    return this.http.get<any>(` ${URL_server}/video/getVideoByJWT`, {
      withCredentials: true,
    });
  }
  //cập nhật video by id
  updateVideoByUserId(data: object): Observable<any> {
    return this.http.post<any>(`${URL_server}/video/update`, data, {
      withCredentials: true,
    });
  }

  deleteVideo(data: object): Observable<any> {
    return this.http.post<any>(`${URL_server}/video/delete`, data, {
      withCredentials: true,
    });
  }

  // getbyid;
  getVideoById(id:number): Observable<any> {
    return this.http.get<any>(` ${URL_server}/video/getbyid/${id}`, {
      withCredentials: true,
    });
  }
}
