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

  disposable = [];

  ngOnInit() {
    this.getRoutes();
    this.disposable.push(this.app.search$.subscribe(str => {
      if(!str){
        this.resetFilter();
      } else {
        this.filter(str);
      }
      
    }));
  }
  
  getRoutes(){
    this.api.getRoutes().subscribe( res => {
      res.json().routes.forEach( r => {
        r.isSuitable = true;
        this.routesDto.push(RouteDto.deserialize(r));
      })
      
    }, err => {

    }, () => {
      this.loading = false;
    })
  }

  details(value){
    this.app.router.navigate(['/route', value]);
  }

  filter(str){
    this.routesDto.forEach(route => {
      if ((route.name && route.name.includes(str)) || (route.description && route.description.includes(str)) || (route.location && route.location.includes(str))){
        route.isSuitable = true;
      } else {
        route.isSuitable = false;
      }
    })
  }

  resetFilter(){
    this.routesDto.forEach(route => {
      route.isSuitable = true;
    })
  }

  get empty(){
    return this.routesDto.length === 0;
  }


}
