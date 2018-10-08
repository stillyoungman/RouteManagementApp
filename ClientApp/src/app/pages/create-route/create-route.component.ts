///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps'
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MapService } from 'src/app/core/services/map.service';


@Component({
  selector: 'create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  @ViewChild('gmap') mapCanvas: any;
  
  constructor(private mapService : MapService) { 
    
  }

  ngOnInit() {
    //implement this!
    //this.reset();

    this.mapService.initMap(new google.maps.Map(this.mapCanvas.nativeElement, this.mapService.mapOptions));
    
    // this.mapService.isRouteStarted.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // )
  }

  //for elements refreshing
  @HostListener('click')
  async someEvent() {
      setTimeout(() => { }, 100);
  }

  // ngAfterViewInit(){
  //   console.log(this.mapService);
  //   this.reset();
  //   console.log(this.mapService);
  //   console.log("reset");
  // }

  // reset(){
    
  // }

}
