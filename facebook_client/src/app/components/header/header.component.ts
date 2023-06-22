// import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { FriendService } from 'src/app/services/friend.service';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  searchValue = new FormControl('');
  boxVisible = false;
  boxVisible1 = false;
  value: string = '';
  sourceProducts = [];
  idFriend: number = 0;
  result: any = [];
  idUser: number = 0;
  valueMess: string = '';
  fullMess: any = [];
  Friend: any = {};
  listUsers: any = [];
  isOpenBox: boolean = false;
  sidebarVisible2: boolean = false;
  oldpass: string = '';
  newpass: string = '';
  textMessage: string =
    'Sau khi đổi mật khẩu , bạn không thể dùng mật khẩu cũ nữa và bạn phải đăng nhập lại để tiếp tục';
  isOpenGoto: boolean = false;
  // targetProducts = [];
  isthugon: boolean = false;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService,
    private friendService: FriendService,
    private socket: Socket
  ) {
    this.idUser = parseInt(cookieService.get('idUser'));
  }

  ngOnInit(): void {
    this.socket.fromEvent('newMess').subscribe((data: any) => {
      console.log('this is newmess', data);
      this.getMessById();
      // this.scrollToBottom();
    });

    this.searchValue.valueChanges.pipe(debounceTime(1000)).subscribe((data) => {
      if (data === '') {
        this.listUsers = [];
        return;
      }
      this.getUserSearch(data);
    });
  }

  getUserSearch(data: any) {
    this.friendService.searchUser({ search: data }).subscribe(
      (res) => {
        console.log('this is list user : ', res);
        this.listUsers = res.data;
        console.log(this.listUsers);
      },
      (err) => console.log(err)
    );
  }

  // scrollToBottom() {
  //   setTimeout(() => {
  //    console.log("hyhy ạ");
  //      this.messageContainer.nativeElement.scrollTop =
  //        this.messageContainer.nativeElement.scrollHeight;
  //   });
  // }
  toggleBox(event: MouseEvent) {
    this.boxVisible = !this.boxVisible;
    event.stopPropagation();
  }

  toggleBox1(event: MouseEvent) {
    this.getMessUser();
    this.boxVisible1 = !this.boxVisible1;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Xử lý sự kiện click trên toàn bộ document
    this.boxVisible = false;
    this.boxVisible1 = false;
  }

  onElementClick(event: MouseEvent): void {
    // Chặn sự kiện click trên toàn bộ document
    event.stopPropagation();
  }

  onElementClick1(event: MouseEvent): void {
    // Chặn sự kiện click trên toàn bộ document
    event.stopPropagation();
  }
  toHome() {
    this.router.navigate(['/']);
    this.boxVisible = false;
    this.boxVisible1 = false;
  }

  onlogout() {
    this.loginService.logoutService().subscribe(
      (res) => {
        console.log('this is logout', res);
        if (res.errCode === 0) {
          this.cookieService.deleteAll();
          console.log('chay vo day');
        }
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
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

  getMessById() {
    this.friendService.getMessbyId(this.idFriend).subscribe(
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

  handlClickOpenMessBox(data: any) {
    // console.log('hello world!', data);
    this.idFriend = parseInt(data.idFriend);
    this.Friend = data;
    this.getMessById();
    // console.log('this is id friend', this.idFriend);
    this.boxVisible1 = false;
    this.isOpenBox = true;
    const beta = {
      receiverId: this.idFriend,
      idUser: this.idUser,
    };
    this.socket.emit('joinRoom', beta);
  }
  handlClickCloseMessBox() {
    this.isOpenBox = false;
    this.isthugon = false;
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
        receiverId: this.idFriend,
      };
      // console.log(this.valueMess);

      this.socket.emit('newMess', data);
      this.valueMess = '';
    }
  }

  ClosoUserBox(e: any) {
    this.listUsers = [];
    console.log('test ', this.searchValue.value);
    this.searchValue.setValue('');
  }

  updatePassword() {
    if (!this.oldpass || !this.newpass) {
      alert('Cần nhập đủ thông tin');
    } else {
      const data = {
        currentPass: this.oldpass,
        newPass: this.newpass,
      };
      this.loginService.changePass(data).subscribe(
        (res) => {
          console.log('this is res', res);
          if (res.errCode === 1) {
            this.textMessage = res.message;
          }
          if (res.errCode === 0) {
            this.onlogout();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  setIsOpenGoto() {
    this.isOpenGoto = !this.isOpenGoto;
  }
  gotoTrangCaNhan() {
    this.router.navigate([`/profile/${this.idFriend} `]);
  }
  gotoMessage() {
    this.router.navigate([`/messages/${this.idFriend}`]);
    this.setIsOpenGoto();
  }
  setisThugon(){
    console.log("hehehe");
    
    this.isthugon = !this.isthugon;
  }
}
