import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable()
export class loginGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('this is router and state', route, state);
    const check = this.loginService.checkLogin();

    if (check) {
      return true;
    } else {
      this.router.navigate(['/login']);

      return false;
    }
  }
}
@Injectable()
export class loginRegisterDontEnterGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('this is router and state', route, state);
    const check = this.loginService.checkLogin();

    if (check) {
      this.router.navigate(['/']);

      return false;
    } else {
      return true;
    }
  }
}
