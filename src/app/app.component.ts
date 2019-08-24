import { MenuService } from './_service/menu.service';
import { Menu } from './_model/menu';
import { LoginService } from './_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menus: Menu[] = [];

  constructor(
    private loginService: LoginService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuService.menuChange.subscribe(data => {
      this.menus = data;
    });
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn() {
    return this.loginService.isLoggedin();
  }
}
