import { Component, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-box-person',
  templateUrl: './box-person.component.html',
  styleUrls: ['./box-person.component.scss'],
})
export class BoxPersonComponent {
  avatar: string = '';
  isActive: boolean = false;

  

  constructor(private homeService: HomeService) {
    this.homeService.getProfile().subscribe((res) => {
      
      if (res.errCode === 0) {
        this.avatar = res.user.avatar;
        this.isActive = true;
      }
    });
  }
}
