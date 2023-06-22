import { Component } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  page: number = 1;
  // homePost : any = [];
  userProfile = {};
  arrPosts = [];
  noneFriends = [];
  friendrequests = [];
  constructor(
    private homeService: HomeService,
    private postService: PostService,
    private friendsService: FriendService
  ) {
    this.getProfileByJwt();
    this.getPostHome();
    this.getNoneFriends();
    this.getSendRequest();
  }

  getProfileByJwt() {
    this.homeService.getProfile().subscribe(
      (data) => {
        console.log('this is data pro', data);
        if (data.errCode === 0) {
          this.userProfile = data.user;
        }
      },

      (err) => {
        console.log(err);
      }
    );
  }
  getNoneFriends() {
    this.homeService.getNonFriends().subscribe(
      (res) => {
        console.log('this is none friends', res);
        this.noneFriends = res.noneFriends;
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  getPostHome() {
    this.postService.getPostsHome({ page: this.page }).subscribe(
      (res) => {
        console.log(' this is my post home', res);
        this.arrPosts = res.posts;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSendRequest() {
    this.friendsService.getReqFriends().subscribe(
      (res) => {
        this.friendrequests = res.friendrequests;
      },
      (err) => {
        console.log('this is my err', err);
      }
    );
  }

  updatePost(event: any) {}
  updateNonefriends() {
    this.getNoneFriends();
  }

  reloadSendReq() {
    this.getSendRequest();
  }
}
