import { map } from 'rxjs/operators';
import { Menu } from './../_model/menu';
import { MenuService } from './menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private router: Router, 
    private loginService: LoginService,
    private menuService: MenuService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {        
    if (!this.loginService.isLoggedin()) {
      // The user is not logged in
      sessionStorage.clear();
      this.router.navigate(['login']);
      return false;
    }
    else {
      const helper = new JwtHelperService();
      const token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (helper.isTokenExpired(token)) {
        // The token is expired
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      }
      else {
        // check the permissions for this user
        // URL that the user want to visit
        let urlExpected = state.url;
        const decodedToken = helper.decodeToken(token);
        return this.menuService.listByUsername(decodedToken.user_name).pipe(map((data: Menu[]) => {
          this.menuService.menuChange.next(data);
          
          for (let menu of data) {
            if (urlExpected === menu.url) {
              return true;
            }
          }
          this.router.navigate(['not403']);
          return false;
        }));
      }
    }
  }
}
