import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../core/services/application.service';
// import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrls: ['./layout-topbar.component.css']
})
export class LayoutTopbarComponent implements OnInit {

  constructor(private app: ApplicationService) { }

  ngOnInit() {
    console.log(this.app.url === '/login')
  }

  get isVisible() {
    return !(this.app.url === "/login" ||
      this.app.url === "/create-account");
  }

  login(){
    this.app.redirectTo("/login");
  }

  create(){
    this.app.redirectTo("/create-account")
  }

  logoLink(){
    if(this.app.url === "/") this.app.router.navigate(["/create-route"])
    else if (this.app.url === "/create-route") this.app.router.navigate(["/"])
    else if (this.app.url === "/create-account" || this.app.url === "/login" ) this.app.back();
  }



}
