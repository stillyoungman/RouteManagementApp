import { Component, OnInit, Input } from '@angular/core';
import { WebApiService } from '../../../core/services/web-api.service';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'route-filler',
  templateUrl: './route-filler.component.html',
  styleUrls: ['./route-filler.component.css']
})
export class RouteFillerComponent implements OnInit {

  @Input() Route;

  constructor(private api:WebApiService, private app: ApplicationService) { }

  ngOnInit() {
  }

  save(){
    console.log("Saving");
    this.api.saveRoute(this.Route).subscribe( res => {
      this.app.redirectTo("my-routes");
    }, err => {
      console.log("ERR", err); 
    });
  }

}
