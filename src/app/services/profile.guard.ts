/*import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const profileGuard: CanActivateFn = (route, state) => {
  const login=inject(LoginService);
  const router=inject(Router);
  if(login.isloggedIn()&&login.userRole()=="admin"){
    return true;
  }
  router.navigate(['login']);
  return false;
};
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn:'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private login:LoginService, private router:Router) {
  
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   if(this.login.isloggedIn()&& this.login.userRole()=="admin"){
    return true;
   }else{
   this.router.navigate(['login']);
    return false;
  }
}
  
}*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.isloggedIn() && this.loginService.userRole() === "ADMIN") {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
