import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApplicationService } from '../core/services/application.service';
import { AuthService } from '../core/services/auth.service';
// import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrls: ['./layout-topbar.component.css']
})
export class LayoutTopbarComponent implements OnInit {

  url;
  disposable = [];

  constructor(private app: ApplicationService, 
      private authService: AuthService,
      private router: Router) { }

  ngOnInit() {
    this.disposable.push(this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        this.url = event.url;
      }
    }))
  }

  logoLink(){
    if(this.app.url === "/") this.app.router.navigate(["/create-route"])
    else if (this.app.url === "/create-account" || this.app.url === "/login" ) this.app.back();
    else this.app.router.navigate(["/"]);
  }

  private get isSearchRequired(){
    return this.url === "/create-route" || this.url === "/my-routes";
  }

  searchKeyup(value){
    this.app.search$.next(value);
  }

  ngOnDestroy(){
    this.disposable.forEach( sub => {
      sub.unsubscribe();
    });
  }


}
