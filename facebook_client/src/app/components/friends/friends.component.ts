import { ChangeDetectorRef, Component } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  Friends: any = [];

  constructor(
    private friendService: FriendService,
    private cdr: ChangeDetectorRef
  ) {
    this.friendService.getFriends().subscribe((res) => {
      // console.log('this is res friends ', res);
      if (res.errCode === 0) {
        this.Friends = res.friendsById;
        this.cdr.detectChanges();
      }
    });
  }
}
