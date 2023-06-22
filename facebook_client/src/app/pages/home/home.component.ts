import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Socket } from 'ngx-socket-io';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userProfile: any = {};
  arrPosts: any = [];
  arrImages: any = [];
  isPersonal: boolean = true;
  isImages: boolean = false;
  isFriends: boolean = false;
  isVideos: boolean = false;
  mess: string = '';
  home: boolean = true;
  displayModal: boolean = false;
  valueusername: string = '';
  valuename: string = '';
  noloadding: boolean = true;
  isloadding: boolean = false;
  viewImage: string = '';
  noneFriends = [];
  constructor(
    private homeService: HomeService,
    // private socket: Socket,
    private firebaseStorage: AngularFireStorage,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getPostsUserHome();
    this.getImages();
    this.getNoneFriends();
  }

  getProfile() {
    this.homeService.getProfile().subscribe(
      (res) => {
        if (res.errCode === 0) {
          this.userProfile = { ...res.user };
          this.viewImage = this.userProfile.avatar;
          this.valuename = this.userProfile.name;
          this.valueusername = this.userProfile.username;
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  getNoneFriends() {
    this.homeService.getNonFriends().subscribe(
      (res) => {
        // console.log('this is none friends', res);
        this.noneFriends = res.noneFriends;
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  getPostsUserHome() {
    this.homeService.getPostsByUser().subscribe(
      (res) => {
        if (res.errCode === 0) {
          this.arrPosts = res.posts;
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  getImages() {
    this.homeService.getImages(6, 0).subscribe(
      (res) => {
        this.arrImages = res.data;
        console.log('this is test imgae', this.arrImages);
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  swapInfo(id: number): void {
    if (id === 1) {
      this.isPersonal = true;
      this.isFriends = false;
      this.isImages = false;
      this.isVideos = false;
    }
    if (id === 2) {
      this.isPersonal = false;
      this.isFriends = true;
      this.isImages = false;
      this.isVideos = false;
    }
    if (id === 3) {
      this.isPersonal = false;
      this.isFriends = false;
      this.isImages = true;
      this.isVideos = false;
    }
    if (id === 4) {
      this.isPersonal = false;
      this.isFriends = false;
      this.isImages = false;
      this.isVideos = true;
    }
  }

  updatePost(value: any) {
    this.arrPosts = [value, ...this.arrPosts];
  }

  updatePostsub(value: any) {
    // this.arrPosts = [value, ...this.arrPosts];

    this.getPostsUserHome();
  }

  async onfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.noloadding = false;
      this.isloadding = true;

      const path = `yt/${file.name}`;
      const upload = await this.firebaseStorage.upload(path, file);
      const url = await upload.ref.getDownloadURL();

      this.viewImage = url;
      this.noloadding = true;
      this.isloadding = false;
    }
  }

  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;
  }

  updateProfile() {
    const data = {
      username: this.valueusername,
      name: this.valuename,
      avatar: this.viewImage,
    };

    this.homeService.updateUser(data).subscribe(
      (res) => {
        console.log('this is res', res);
        if (res.errCode == 0) {
          this.hideModal();

          this.getProfile();
          this.notificationsService.info('info', `Cập nhật thành công`, {
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  updateNonefriends() {
    this.getNoneFriends();
  }
}
