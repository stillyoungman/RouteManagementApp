import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../core/services/application.service';
import { AuthService } from '../core/services/auth.service';
// import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrls: ['./layout-topbar.component.css']
})
export class LayoutTopbarComponent implements OnInit {

  constructor(private app: ApplicationService, private authService: AuthService) { }

  ngOnInit() {
    
  }

  get isVisible() {
    return !(this.app.url === "/login" ||
      this.app.url === "/create-account");
  }

  logoLink(){
    if(this.app.url === "/") this.app.router.navigate(["/create-route"])
    else if (this.app.url === "/create-account" || this.app.url === "/login" ) this.app.back();
    else this.app.router.navigate(["/"]);
  }



}
