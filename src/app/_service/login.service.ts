import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.HOST}/oauth/token`; 
  
  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  login(username: string, password: string) {
    const body = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic '+btoa(environment.TOKEN_AUTH_USERNAME+':'+environment.TOKEN_AUTH_PASSWORD))
    })
  }

  sendEmail(email: string) {
    return this.http.post<number>(`${environment.HOST}/login/sendEmail`, email, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  checkResetToken(token: string) {
    return this.http.get<number>(`${environment.HOST}/login/reset/check/${token}`);
  }

  resetPassword(token: string, password: string) {
    return this.http.post<number>(`${environment.HOST}/login/reset/${token}`, password, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  logout() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST}/tokens/revoke/${token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }

  isLoggedin() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }
  
}
