import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss'],
})
export class SendRequestComponent {
  @Input() friendReq: any = {};
  @Output() newItemEvent = new EventEmitter();

  constructor(
    private friendService: FriendService,
    private notificationsService: NotificationsService
  ) {
    // console.log("this is a friend request" , this.friendReq);
  }

  handleClickaccept() {
    // console.log("abc : " , this.friendReq.id);
    const data = {
      id: this.friendReq.id,
    };
    this.friendService.acceptFriendAdd(data).subscribe(
      (res) => {
        console.log('res', res);
        this.notificationsService.info('Đồng ý', `Chấp nhận lời mời`, {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });

        setTimeout(() => {
          this.newItemEvent.emit();
        }, 1000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleClickCancel() {
    // console.log("abc : " , this.friendReq.id);
    const data = {
      id: this.friendReq.id,
    };
    this.friendService.acceptFriendAdd(data).subscribe(
      (res) => {
        console.log('res', res);
        this.notificationsService.error('Từ chối', `Từ chối lời mời`, {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });

        setTimeout(() => {
          this.newItemEvent.emit();
        }, 1000);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
