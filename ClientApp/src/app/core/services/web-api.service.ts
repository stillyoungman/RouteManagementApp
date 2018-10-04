import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from './application.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  BASE_URL: string;

  constructor(private http: Http, private app: ApplicationService) { 
    this.BASE_URL = document.getElementsByTagName('base')[0].href;
  }

  get token() {
    return localStorage.getItem("t");
  }

  get tokenClaims(){
    return JSON.parse(atob(this.token.split('.')[1]));
  }

  get tokenHeader() {
    return new Headers({ 'Authorization': `Bearer ${this.token}` });
  }

  get authPath() {
    return this.BASE_URL + "api/auth/";
  }

  getUserRoutes() {

  }

  _debugGetToken(userDto){
    this.http.post(this.authPath + 'token',userDto)
    .subscribe( res => {
      localStorage.setItem('t', res.json().access_token); 
    })
  }



  register(userDto) {
    this.http.post(this.authPath + "register", userDto)
      .subscribe( res => {
          if (res.status == 200){
            
          } else {
            // setMessage(res.json().message);
          }
        // localStorage.setItem('t', res.json().access_token); 
      })
  }

  authenticate(loginUserDto){
    return this.http.post(this.authPath + "auth", loginUserDto);
  }
}
