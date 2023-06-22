import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-box-friend',
  templateUrl: './box-friend.component.html',
  styleUrls: ['./box-friend.component.scss'],
  providers: [MessageService],
})
export class BoxFriendComponent implements OnInit {
  @Input() item: any = {};
  idItem: number = 0;
  idUser: number = 0;
  newItem: any;
  items: MenuItem[] = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      this.newItem = changes['item'].currentValue;
      this.idItem = this.item.id;
    }
  }
  constructor(private router: Router, private cookieService: CookieService) {
    // console.log('this is item', this.item);
    this.newItem = this.item;
    this.idUser = parseInt(this.cookieService.get('idUser'));
  }
  ngOnInit() {
    this.items = [
      {
        // label: '',

        items: [
          {
            label: ' Cá Nhân',
            icon: 'pi pi-check',
            command: () => {
              this.handleItemClickToProfile(this.idItem);
            },
          },
          {
            label: 'Nhắn Tin',
            icon: 'pi pi-fw pi-trash',
          },
          // {
          //   separator: true,
          // },
          {
            label: 'Hủy Kết Bạn',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
    ];
  }

  handleItemClickToProfile(id: any) {
    // console.log('this is data', id);
    if(id === this.idUser){
    this.router.navigate([`/`]);
    }
    else{
      this.router.navigate([`/profile/${id}`]);
    }
  }
}
