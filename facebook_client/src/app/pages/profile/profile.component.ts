import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { HomeService } from 'src/app/services/home.service';
import { FriendService } from 'src/app/services/friend.service';
// import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  idUser: number = 1;
  idParam: number = 1;
  page: number = 1;
  posts: any = [];
  arrImages: any = [];
  userProfile: any = {};
  User: any = {};
  checkFri: any = {
    issend: false,
    accept: false,
  };
  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private homeService: HomeService,
    private friendService: FriendService
  ) {
    this.idUser = parseInt(this.cookieService.get('idUser'));
  }
  
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const paramValue = params['id'];
      this.idParam = parseInt(paramValue);
      if (this.idUser === parseInt(paramValue)) {
        this.router.navigate([`/`]);
      }
    });
    this.homeService.getProfilebyId(this.idParam).subscribe(
      (res) => {
        if (res.errCode === 0) {
          this.userProfile = res.user;
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
    this.postService.getPosts({ page: this.page, id: this.idParam }).subscribe(
      (res) => {
        this.posts = res.posts;
      },
      (err) => {
        console.log('this is err new', err);
      }
    );
    this.getUser();
    this.getImages();
    this.checkFriend();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const myParam = params.get('id');
      // Xử lý khi param 'myParam' thay đổi trên URL
      this.homeService.getProfilebyId(myParam).subscribe(
        (res) => {
          if (res.errCode === 0) {
            this.userProfile = res.user;
          }
        },
        (err) => {
          console.log('this is err', err);
        }
      );
      this.postService.getPosts({ page: this.page, id: myParam }).subscribe(
        (res) => {
          this.posts = res.posts;
        },
        (err) => {
          console.log('this is err new', err);
        }
      );
      console.log('id is:', myParam);
    });
  }

  getUser() {
    this.homeService.getProfilebyId(this.idUser).subscribe(
      (res) => {
        if (res.errCode === 0) {
          this.User = res.user;
        }
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  getImages() {
    this.homeService.getImages(6, this.idParam).subscribe(
      (res) => {
        this.arrImages = res.data;
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  checkFriend() {
    this.friendService
      .checkFriendService({ receiverId: this.idParam })
      .subscribe(
        (res) => {
          // this.arrImages = res.data;
          console.log('this is check friends', res);
          this.checkFri.accept = res.accept;
          this.checkFri.issend = res.issend;
        },
        (err) => {
          console.log('this is err', err);
        }
      );
  }

  gotoMess(){
    console.log(this.idParam);
    this.router.navigate([`messages/${this.idParam}`]);
    
  }
}
