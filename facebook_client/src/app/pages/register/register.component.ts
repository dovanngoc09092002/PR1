import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  cookies = document.cookie;

  dataRegister = this.fb.group({
    username: '',
    password: '',
    name: '',
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    // private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {
    
  }

  register() {
    // console.log(this.dataRegister.value);
    this.loginService.register(this.dataRegister.value).subscribe((res) => {
    

      if (res.errCode === 0) {
        this.router.navigate(['/login']);
      }
      if (res.errCode == 1) {
   

        this.notificationsService.info('info', `${res.message}`, {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });
      }
    });
  }

  viewCookie() {
   
  }
}
