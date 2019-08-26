import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  email: string;
  message: string;
  error: string;
  percentage: number = 0;

  constructor(
    private loginService: LoginService, 
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  send() {
    this.percentage = 99;
    this.loginService.sendEmail(this.email).subscribe(data => {
      if (data == 1) {
        this.message = "The instructions to reset your password were sent to your email"
        this.error = null;
        this.percentage = 100;
      }
      else {
        this.error = "The email typed does not exists";
        this.percentage - 0;
      }
    },
    error => {
      console.log(error);
    });
  }
}
