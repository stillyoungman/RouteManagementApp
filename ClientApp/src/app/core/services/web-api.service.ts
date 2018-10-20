import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from './application.service';
import { Observable, of, throwError } from 'rxjs';
import { Route } from '../models/route';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { RouteStorageService } from './route-storage.service';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  BASE_URL: string;

  constructor(private http: Http, 
      private app: ApplicationService,
      private notiService: NotificationService,
      private routeStorage: RouteStorageService) { 
    this.BASE_URL = document.getElementsByTagName('base')[0].href;
  }

  get token() {
    return localStorage.getItem("t");
  }

  get tokenClaims(){
    try {
      return JSON.parse(atob(this.token.split('.')[1]));
    }
    catch {
      return { };
    }
  }

  get tokenHeader() {
    return new Headers({ 'Authorization': `Bearer ${this.token}` });
  }

  get authPath() {
    return this.BASE_URL + "api/auth/";
  }
  get routeApiPath(){
    return this.BASE_URL + "api/route/";
  }

  getUserRoutes() {

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

  updateRouteHeader(routeHeader){
    return this.http.put(this.routeApiPath + "updateRoute",routeHeader,new RequestOptions({
      headers: this.tokenHeader
    })).pipe(
      catchError( err => {
        this.notiService.notify("Can't update route");
        return throwError(err);
      })
    )
  }

  getRoutes(){
    return this.http.get(this.routeApiPath + "getroutes", new RequestOptions({
      headers:this.tokenHeader
    }));
  }

  getRoute(id){
    return this.http.get(this.routeApiPath + `getroute?id=${id}`, new RequestOptions({
      headers:this.tokenHeader
    })).pipe(
      catchError( err => {    
        return throwError(err); 
      })
    )
  }

  register(userDto) {
    return this.http.post(this.authPath + "register", userDto);
  }

  authenticate(loginUserDto){
    return this.http.post(this.authPath + "auth", loginUserDto);
  }

  get staticMapRequest(){
    let base = 'https://maps.googleapis.com/maps/api/staticmap?';
    let mapParams = 'size=640x330&scale=2&format=png&zoom=' + this.routeStorage.zoom;
    let pathOptions = '&path=weight:3%7Ccolor:0x283747%7C';
    let encPath = 'enc:' + google.maps.geometry.encoding.encodePath(this.routeStorage.path);
    let key;
    try {
      key = '&' + document.getElementById('api-script') 
      .attributes['src']
      .value.split('&')
      .filter(str => str.includes('key'))[0]
      .split('?')
      .filter(str => str.includes('key'))[0] //because i dont know regExp(((
    } catch { }

    let checkpointMarkers = '';
    this.routeStorage.checkpointsLocations.forEach(location => {
      checkpointMarkers += '&markers=size:tiny%7Ccolor:0xD4E157%7Clabel:C%7C' + location;
    })
  
    let points = this.routeStorage.points;
    let pointsMarkers = '&markers=size:tiny%7Ccolor:0x43A047%7Clabel:C%7C' + points['start'];
    pointsMarkers += '&markers=size:tiny%7Ccolor:0xF44336%7Clabel:C%7C' + points['end'];
  
    let result = base + mapParams + pointsMarkers + checkpointMarkers + pathOptions + encPath + key;
    
    return result;
  }
}
