// import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationsService } from 'angular2-notifications';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: any = {};
  @Input() isEditAndDelete: any;
  @Input() userProfile: any = {};
  @Output() voteSize = new EventEmitter();

  displayModal1: boolean = false;
  displayModal2: boolean = false;

  cmt: string = '';
  comments: any = [];
  isView: boolean = false;
  isLike: boolean = false;
  idUser: number = 0;
  noloadding: boolean = true;
  isloadding: boolean = false;
  value: string = '';
  viewImage: string = '';
  ngOnChanges(changes: SimpleChanges) {
    if (changes['post']) {
      this.post = changes['post'].currentValue;

      this.viewImage = this.post.postImage;
      this.value = this.post.postText;
    }
    if (this.post && this.post.id) {
      this.postService.getComments(this.post.id).subscribe(
        (res) => {
          this.comments = res.data;
          // console.log('hien thi comment cua 1 post', this.comments);
        },
        (err) => {
          console.log('this is err', err);
        }
      );
      this.postService.checkIsLike({ PostId: this.post.id }).subscribe(
        (res) => {
          // console.log('this is res like', res);
          if (res.data === true) {
            this.isLike = true;
          }
          if (res.data === false) {
            this.isLike = false;
          }
        },
        (err) => {
          console.log('this is err', err);
        }
      );
    }
  }
  constructor(
    private postService: PostService,
    private cookieService: CookieService,
    private socket: Socket,
    private firebaseStorage: AngularFireStorage,
    private notificationsService: NotificationsService
  ) {
    this.idUser = parseInt(this.cookieService.get('idUser'));
  }
  ngOnInit(): void {
    this.socket.fromEvent('newComment').subscribe((data: any) => {
      if (data.PostId === this.post.id) {
        // console.log('Received message from server:', data); // Nhận sự kiện 'message' từ máy chủ socket
        this.comments = [...this.comments, data];
      }
    });
  }
  setIsView() {
    this.isView = true;
  }
  setIsViewFlase() {
    this.isView = false;
  }
  likePost() {
    this.postService.like({ PostId: this.post.id }).subscribe(
      (res) => {
        // console.log('log like ', res);
        if (res.errCode === 0) {
          if (res.like === true) {
            this.post.likes = this.post.likes + 1;
            this.isLike = true;
          }
          if (res.like === false) {
            this.post.likes = this.post.likes - 1;
            this.isLike = false;
          }
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }
  sendMessage() {
    if (this.cmt === '') {
      alert('Bạn chưa Bình Luận');
    } else {
      // console.log('this is name', this.cmt);
      this.postService.sendMessage({
        cmt: this.cmt,
        idUser: this.idUser,
        PostId: this.post.id,
      });

      this.cmt = '';
    }
  }

  async onfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // console.log('this is file updated', file);
      this.noloadding = false;
      this.isloadding = true;
      const path = `yt/${file.name}`;
      const upload = await this.firebaseStorage.upload(path, file);
      const url = await upload.ref.getDownloadURL();
      // console.log('this is url', url);
      this.viewImage = url;
      this.noloadding = true;
      this.isloadding = false;
    }
  }

  showModal1() {
    this.displayModal1 = true;
  }

  hideModal1() {
    this.displayModal1 = false;
  }

  showModal2() {
    this.displayModal2 = true;
  }

  hideModal2() {
    this.displayModal2 = false;
  }
  updatePost() {
    const data = {
      postText: this.value,
      postImage: this.viewImage,
    };
    const idPost = parseInt(this.post.id);
    this.postService.updatePostService(data, idPost).subscribe(
      (res) => {
        // console.log('this is res ', res);
        if (res.errCode === 0) {
           this.voteSize.emit(res.errCode);
           this.value = '';
           this.viewImage = '';
           this.displayModal1 = false;
          
          
        }
       
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  deletePost() {
  
    const id = parseInt(this.post.id);
    this.postService.deletePostService( id).subscribe(
      (res) => {
        // console.log('this is res ', res);
        if (res.errCode === 0) {
          this.notificationsService.info(
            'Thông báo : ',
            `Xóa thành công`,
            {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            }
          );
          
          this.displayModal2 = false;
        }
        this.voteSize.emit(res.errCode);
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }
}
