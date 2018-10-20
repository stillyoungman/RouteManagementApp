import { Component, OnInit, Input } from '@angular/core';
import { WebApiService } from '../../../core/services/web-api.service';
import { ApplicationService } from 'src/app/core/services/application.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Route } from 'src/app/core/models/route';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'route-filler',
  templateUrl: './route-filler.component.html',
  styleUrls: ['./route-filler.component.css']
})
export class RouteFillerComponent implements OnInit {

  context = '';
  disposable = [];
  btnText = 'Save';
  @Input() Route: Route; 

  constructor(private api:WebApiService, 
    private app: ApplicationService, 
    private auth: AuthService,
    private route: ActivatedRoute,
    private nf: NotificationService) {
      this.disposable.push(this.route.url.subscribe(url => {
        this.context = url[0].path;
        if(this.context === 'route'){
          this.btnText = 'Update';
        }
      }))
     }

  ngOnInit() {
    console.log(this.Route);
    console.log("owner",this.isOwner);
    
  }

  get isOwner(){
    if (this.context === 'create-route'){
      return true;
    } else if (this.context === 'route'){
      if (this.auth.isAuthenticated && this.auth.tokenClaims.uid === ''+ this.Route["userId"]){
        return true;
      } else return false;
    }
  }

  save(){
    if(this.context === 'create-route'){
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
    } else if (this.context === 'route'){
      this.api.updateRouteHeader(this.Route).subscribe( res => {
        this.nf.notify('Updated');
        console.log(res);
      }), err => {
        this.nf.notify("Can't update(")
      }
    }
    
  }

  ngOnDestroy(){
    this.disposable.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
