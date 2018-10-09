import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../core/services/web-api.service';
import { Route, RouteDto } from '../../core/models/route';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css']
})
export class MyRoutesComponent implements OnInit {

  routes = [];
  routesDto = [];
  loading = true;

  constructor(private api: WebApiService, private app: ApplicationService) { }

  ngOnInit() {
    this.getRoutes(this.routes);
  }
  
  getRoutes(routes){
    this.api.getRoutes().subscribe( res => {
      // this.routes = res.json().routes;
      this.loading = false;
      res.json().routes.forEach( r => {
        this.routesDto.push(RouteDto.deserialize(r));
      })
      console.log("routesDto", this.routesDto);
      console.log("res", res);
    }, err => {

    }, () => {
      console.log("Complete")
      // console.log("routes", this.routes);
    })
  }

  details(value){
    this.app.router.navigate(['/route', value]);
    console.log(value);
  }


}
