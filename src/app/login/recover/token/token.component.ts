import { PasswordValidation } from './match';
import { LoginService } from './../../../_service/login.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  form: FormGroup;
  token: string;
  error: string;
  result: number;
  tokenValid: boolean;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });

    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.loginService.checkResetToken(this.token).subscribe(data => {
        if (data == 1) {
          this.tokenValid = true;
        }
        else {
          this.tokenValid = false;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }

      });
    });
  }

  onSubmit() {
    let password: string = this.form.value.confirmPassword;
    this.loginService.resetPassword(this.token, password).subscribe(data => {
      if (data == 1) {
        this.result = 1;
      }
    }, (err => {
      this.result = 0;
    }));
  }
}
