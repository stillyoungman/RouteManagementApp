import { Component, OnInit, Input } from '@angular/core';
import { WebApiService } from '../../../core/services/web-api.service';
import { ApplicationService } from 'src/app/core/services/application.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'route-filler',
  templateUrl: './route-filler.component.html',
  styleUrls: ['./route-filler.component.css']
})
export class RouteFillerComponent implements OnInit {

  @Input() Route;

  constructor(private api:WebApiService, private app: ApplicationService, private auth: AuthService) { }

  ngOnInit() {
  }

  save(){
    if(!this.auth.isAuthenticated){
      sessionStorage.setItem('toSave',JSON.stringify(this.Route));
      this.app.redirectTo("login");
      return;
    }
    
    this.api.saveRoute(this.Route).subscribe( res => {
        this.app.redirectTo("my-routes");
    }, err => {
      
    }, () => {

    });
  }

}
