import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.scss'],
})
export class AddfriendComponent {
  @Input() noneFriend: any = {};
  @Output() voteSize1 = new EventEmitter();

  constructor(
    private friendService: FriendService,
    private notificationsService: NotificationsService
  ) {}

  handleClicksendReq() {
    this.friendService
      .sendRequest({ receiverId: this.noneFriend.id })
      .subscribe(
        (res) => {
          // console.log('gui loi moi ', res);
          if (res.errCode === 0) {
            this.voteSize1.emit(res.errCode);

            this.notificationsService.info('info', `Gửi lời mời thành công`, {
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
}
