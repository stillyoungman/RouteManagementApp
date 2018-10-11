///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps'
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from 'src/app/core/services/web-api.service';
import { MapService } from 'src/app/core/services/map.service';
import { Route } from 'src/app/core/models/route';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @ViewChild('map') mapCanvas: any;

  loaded;
  routeId;
  userRoute:Route;
  area = "map";

  constructor(private route: ActivatedRoute, 
      private api: WebApiService, 
      private mapService : MapService,
      private notiService: NotificationService) { }

  ngOnInit() {
    this.loaded = false;
    this.mapService.initMap(new google.maps.Map(this.mapCanvas.nativeElement, this.mapService.mapOptions))
    
    this.route.paramMap.subscribe( params => {
      this.routeId = params.get("id");
      this.api.getRoute(this.routeId).subscribe( res => {
        console.log(Route.deserialize(res.json().route))
        this.userRoute = Route.deserialize(res.json().route)
        this.loaded = true;
        this.mapService.populateFromRoute(this.userRoute);
        this.getRouteDetails();
      }, err => {

      }, () => {
        
      })
    }); 
  }

  setArea(value){
    this.area = value;
  }

  getRouteDetails(){
    let points = [];
    this.userRoute.segments.forEach(segment => {
      segment.sections.forEach(section => {
        points.push(section.markerType);
      });
    })
    console.log("Points", points);
  }

}
