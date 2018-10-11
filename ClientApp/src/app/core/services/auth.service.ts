import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { WebApiService } from './web-api.service';
import { ApplicationService } from './application.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _isAuthenticated: boolean;
  errorMessage;
  claims;

  constructor(private api: WebApiService, 
      private app: ApplicationService,
      private notiService: NotificationService) {
    if (!!localStorage.getItem('t')) {
      // this._isAuthenticated = true;
      this.claims = this.tokenClaims;
    }
  }

  get isAuthenticated(){
    return !!localStorage.getItem('t');
  }

  set isAuthenticated(value){
    this._isAuthenticated = value;
  }

  get tokenClaims() {
    return this.api.tokenClaims;
  }

  authenticate(loginUserDto: { email: string, password: string }) {
    this.api.authenticate(loginUserDto).subscribe(res => {
      localStorage.setItem('t', res.json().access_token);
      
      this.saveFromLocalStorate();

      this._isAuthenticated = true;
      this.claims = this.tokenClaims;
      this.errorMessage = undefined;
    },
      err => {
        this.errorMessage = err.json().message;
      })
  }

  register(userDto: { name: string, email: string, password: string }) {
    this.api.register(userDto).subscribe(res => {
      this.authenticate({ email: userDto.email, password: userDto.password });
    }, err => {
      this.errorMessage = err.json().message;
    })
  }

  logout() {
    this._isAuthenticated = false;
    localStorage.removeItem('t');
  }

  private saveFromLocalStorate(){
    if(sessionStorage.getItem('toSave')){
      this.api.saveRoute(JSON.parse(sessionStorage.getItem('toSave')))
        .subscribe( res => {
            this.app.redirectTo('my-routes');
        }, err => { 
          this.app.redirectTo('')
        }, () => {
          sessionStorage.removeItem('toSave');
        });
    } else {
      this.app.router.navigate(["create-route"]);
    }
  }
}
