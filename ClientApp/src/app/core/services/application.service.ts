import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  element$:Subject<{index:number;height:number}>;

  constructor(public router: Router) { 
    this.element$ = new Subject();
  }

  saveBackLink(){
    if (!(this.router.url === "/login" || this.router.url === "/create-account")){
      sessionStorage.setItem("backLink",this.router.url);
    }
  }
  back(){
    let link = sessionStorage.getItem("backLink") ? sessionStorage.getItem("backLink") : "/";
    this.router.navigate([link]);
  }

  redirectTo(path){
    this.saveBackLink();
    this.router.navigate([path]);
  }

  get url(){
    return this.router.url;
  }
}
