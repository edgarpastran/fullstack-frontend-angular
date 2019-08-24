import { Router } from '@angular/router';
import { LoginService } from './../_service/login.service';
import { Component, OnInit } from '@angular/core';
import '../login-animation.js';
import { environment } from 'src/environments/environment';
import { MenuService } from '../_service/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: string;
  error: string;

  constructor(
    private loginService: LoginService, 
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {    
    (window as any).initialize();
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      if (data) {
        const helper = new JwtHelperService();
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

        let token = sessionStorage.getItem(environment.TOKEN_NAME);
        let decodedToken = helper.decodeToken(token);        

        this.menuService.listByUsername(decodedToken.user_name).subscribe(data => {
          this.menuService.menuChange.next(data);
          this.router.navigate(['purchase']);
        });        
      }
    });
  }

}
