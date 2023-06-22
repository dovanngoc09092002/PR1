import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { FriendService } from 'src/app/services/friend.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  value: string = '';
  idParam: number = 0;
  fullMess: any = [];
  idUser: number = 0;
  valueMess: string = '';
  result: any = [];
  friend : any  = {};

  constructor(
    private route: ActivatedRoute,
    private friendService: FriendService,
    private cookieService: CookieService,
    private socket: Socket,
    private router: Router,
    private homeService : HomeService
  ) {
    this.route.params.subscribe((params: Params) => {
      const paramValue = params['id'];
      this.idParam = parseInt(paramValue);
    });
    this.idUser = parseInt(cookieService.get('idUser'));
    this.getMessById();
    this.joinRoom();
    this.getMessUser();
    this.getProfile();
  }
  ngOnInit(): void {
    // this.getMessById();

    this.socket.fromEvent('newMess').subscribe((data: any) => {
    
      this.getMessById();

      // this.scrollToBottom();
    });
  }
  joinRoom() {
    const beta = {
      receiverId: this.idParam,
      idUser: this.idUser,
    };
    this.socket.emit('joinRoom', beta);
  }
  getMessById() {
    this.friendService.getMessbyId(this.idParam).subscribe(
      (res) => {
        this.fullMess = res.data;
        this.fullMess.forEach((item: any) => {
          if (item.senderId == this.idUser) {
            item.isYou = true;
            item.avatar = '';
          }
          if (item.receiverId == this.idUser) {
            item.isYou = false;
            item.avatar = item.usersender.avatar;
          }
        });
        console.log('this is full mess', this.fullMess);
      },
      (err) => {
        console.log('this is err', err);
      }
    );
  }

  getMessUser() {
    this.friendService.getMessUser().subscribe(
      (res) => {
        // console.log('this is res', res);
        if (res.errCode === 0) {
          this.result = res.result;
          // console.log("this is result" , this.result);

          this.result.forEach((item: any, index: number) => {
            if (item === null) this.result.splice(index, 1);
          });

          this.result.forEach((item: any) => {
            item.content = item.content.slice(0, 15);
            if (item.userreceiver.id == this.idUser) {
              item.avatar = item.usersender.avatar;
              item.nameMess = item.usersender.name;
              item.name = item.usersender.name;
              item.idFriend = item.usersender.id;
            }
            if (item.usersender.id == this.idUser) {
              item.avatar = item.userreceiver.avatar;
              item.name = item.userreceiver.name;
              item.idFriend = item.userreceiver.id;

              item.nameMess = 'Bạn';
            }
          });

          console.log('this is result', this.result);
        }
      },

      (err) => {
        console.log('this is err', err);
      }
    );
  }
  onKeyUp(event: any) {
    if (event.key === 'Enter') {
      // Xử lý sự kiện "Enter" ở đây
      this.sendMessageUser();
    }
  }

  sendMessageUser() {
    if (this.valueMess === '') {
      alert('Bạn chưa điền tin nhắn');
    } else {
      // const data = {
      //   receiverId: this.idFriend,
      //   idUser : this.idUser
      // };
      const data = {
        content: this.valueMess,
        idUser: this.idUser,
        receiverId: this.idParam,
      };
      // console.log(this.valueMess);

      this.socket.emit('newMess', data);
      this.valueMess = '';
      this.getMessUser();
    }
  }

  gotoMess(id : number){
    this.router.navigate([`messages/${id}`]);
    this.idParam = id;
    this.getMessById();
    this.getProfile();

  }
  getProfile(){
    this.homeService.getProfilebyId(this.idParam).subscribe(
      (res) => {
        // console.log(res);
        this.friend = res.user;

      },
      (err) => {
        console.log(err);
      }
    );
  }
}
