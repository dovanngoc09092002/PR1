import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular_note';
  isLogin: boolean = false;
  cookieValue: string;
  constructor(private cookieService: CookieService, private router: Router) {
    this.cookieValue = this.cookieService.get('token');

    // if (this.cookieValue) {
    //   this.isLogin = true;
    // }
    // console.log('cookie is', this.isLogin);
    // if (this.isLogin) {
    //   console.log('dang nhap thanh cong');
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}
