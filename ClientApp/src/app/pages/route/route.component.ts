import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from 'src/app/core/services/web-api.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {


  routeId;
  userRoute;

  constructor(private route: ActivatedRoute, private api: WebApiService) { }

  ngOnInit() {
    console.log("init!!!");
    this.route.paramMap.subscribe( params => {
      this.routeId = params.get("id");
      this.api.getRoute(this.routeId).subscribe( res => {
        console.log("response", res);
        console.log("route", res.json().route);
      })
    });
  }

}
