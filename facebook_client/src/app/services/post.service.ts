import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_server } from '../api';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private socket: Socket) {}
  //gửi bình luận
  sendMessage(data: any) {
    this.socket.emit('newComment', data);
    // console.log("this is data mess : " ,data);
  }

  // getMessage() {
  //   return this.socket
  //     .fromEvent('newComment')
  //     .pipe(map((data: any) => data.msg));
  // }
  //lấy ra các comments của người dùng
  getComments(id: number): Observable<any> {
    return this.http.get<any>(` ${URL_server}/comment/getbyidpost/${id} `);
  }

  //like bài viết
  checkIsLike(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/like/islike `, data, {
      withCredentials: true,
    });
  }

  // kiểm tra xem đã like bài viết hay chưa
  like(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/like/check `, data, {
      withCredentials: true,
    });
  }

  //lấy ra bài post của trang home
  getPostsHome(data: any): Observable<any> {
    return this.http.get<any>(`${URL_server}/post/posts/home?page=${data.page}&limit=8`);
  }

  //lấy ra bài post của khách mình xem
  getPosts(data: any): Observable<any> {
    return this.http.get<any>(
      `${URL_server}/post/posts/getbyuserid?page=${data.page}&limit=5&id=${data.id}`
    );
  }
  //tạo bài viết mới
  createPostService(data: object): Observable<any> {
    return this.http.post<any>(` ${URL_server}/post `, data, {
      withCredentials: true,
    });
  }

  //update bài viết
  updatePostService(data: object, id: number): Observable<any> {
    return this.http.post<any>(` ${URL_server}/post/${id} `, data, {
      withCredentials: true,
    });
  }

  //delete bài viết
  deletePostService(id: number): Observable<any> {
    return this.http.post<any>(
      ` ${URL_server}/post/delete/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
