import { Component, OnInit, Input } from '@angular/core';
import { WebApiService } from '../../../core/services/web-api.service';

@Component({
  selector: 'route-filler',
  templateUrl: './route-filler.component.html',
  styleUrls: ['./route-filler.component.css']
})
export class RouteFillerComponent implements OnInit {

  @Input() Route;

  constructor(private api:WebApiService) { }

  ngOnInit() {
  }

  save(){
    console.log("Saving");
    this.api.saveRoute(this.Route).subscribe( res => {
      console.log(res.json());
    }, err => {
      console.log("ERR", err); 
    });
  }

}
