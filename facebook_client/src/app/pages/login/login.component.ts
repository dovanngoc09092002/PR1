import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { CookieService } from 'ngx-cookie-service';
     
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: '',
    password: '',
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private notificationsService: NotificationsService,
    private cookieService: CookieService
  ) {}

  onLogin() {
    this.loginService.login(this.loginForm.value).subscribe((res) => {

      if (res.errCode === 0) {
        this.cookieService.set('token', res.token);
        this.cookieService.set('idUser', res.idUser);
        this.router.navigate(['/']);
      }
      if (res.errCode === 1) {
        this.notificationsService.info('info', `${res.message}`, {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        });
      }
    });
  }
}
