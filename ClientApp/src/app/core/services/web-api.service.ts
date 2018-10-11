import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from './application.service';
import { Observable, of, throwError } from 'rxjs';
import { Route } from '../models/route';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  BASE_URL: string;

  constructor(private http: Http, 
      private app: ApplicationService,
      private notiService: NotificationService) { 
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
  get routeApiPath(){
    console.log(this.BASE_URL);
    return this.BASE_URL + "api/route/";
  }

  getUserRoutes() {

  }

  //remove in PRODUCTION
  _debugGetToken(userDto){
    this.http.post(this.authPath + 'token',userDto)
    .subscribe( res => {
      localStorage.setItem('t', res.json().access_token); 
    })
  }

  saveRoute(route: Route){
    return this.http.post(this.routeApiPath + "SaveRoute", route, new RequestOptions({
      headers: this.tokenHeader
    })).pipe(
      catchError( err => {
        this.notiService.notify("Can't save route");
        return throwError(err);
      })
    );
  }

  getRoutes(){
    return this.http.get(this.routeApiPath + "getroutes", new RequestOptions({
      headers:this.tokenHeader
    }));
  }

  getRoute(id){
    return this.http.get(this.routeApiPath + `getroute?id=${id}`, new RequestOptions({
      headers:this.tokenHeader
    }))
  }

  register(userDto) {
    return this.http.post(this.authPath + "register", userDto);
  }

  authenticate(loginUserDto){
    return this.http.post(this.authPath + "auth", loginUserDto);
  }
}
