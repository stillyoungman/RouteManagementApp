///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps'
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebApiService } from 'src/app/core/services/web-api.service';
import { MapService } from 'src/app/core/services/map.service';
import { Route } from 'src/app/core/models/route';
import { NotificationService } from 'src/app/core/services/notification.service';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { RouteDetailsComponent } from 'src/app/map-components/details/route-details/route-details.component';
import { detachEmbeddedView } from '@angular/core/src/view';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @ViewChild('map') mapCanvas: any;
  // @ViewChild('details') details;
  @ViewChild('wrap') wrap;
  @ViewChild(RouteDetailsComponent) details; 

  disposable = [];
  loaded = false;
  routeId;
  userRoute: Route;
  elements = [];
  elementsLoaded = false;
  _area = "map";
  page;
  _wrapHeight;
  asyncElements;
  asyncHeight;

  get area() {
    return this._area;
  }
  set area(value) {
    if (value === 'details'){
      this.details.isActive = true;
      this._area = value;
    }
    else {
      this._area = 'map'; 
      this.mapService.fitBounds();
    }
  }

  constructor(private route: ActivatedRoute,
    private api: WebApiService,
    private mapService: MapService,
    private router: Router,
    private notiService: NotificationService,
    ) { 
      this.asyncElements = Observable.create(observer=>{
        let i = setInterval(()=>{
            if(this.elementsLoaded){
              clearInterval(i);
              observer.next(this.elements);
              observer.complete();
            }
          },100)
      })
      this.asyncHeight = Observable.create(observer=>{
        let i = setInterval(()=>{
          if(this._wrapHeight){
            clearInterval(i);
            observer.next(this._wrapHeight);
            observer.complete();
          }
        },100);
      })
    }

  ngOnInit() {
    this.mapService.initMapForShow(new google.maps.Map(this.mapCanvas.nativeElement, this.mapService.optionsForShow))
    let sub1,sub2,sub3;
    sub1 = this.route.paramMap.subscribe(params => {
      this.routeId = params.get("id");
      sub2 = this.api.getRoute(this.routeId).subscribe(res => {
        this.userRoute = Route.deserialize(res.json().route)
        this.loaded = true;
        this.mapService.populateFromRoute(this.userRoute);
        this.elementsLoaded = this.fillElements(this.userRoute, this.elements);        
      }, err => {
        if(err.status === 403){
          this.router.navigate(['/']);
        } else {
          this.notiService.notify("oops, something went wrong(")
        }
      }, () => {
        
      })
    });
    this._wrapHeight = this.wrap.nativeElement.offsetHeight;
    sub3 = this.route.queryParamMap.subscribe(paramMap => {
      this.area = paramMap.get('area');
      this.page = paramMap.get('page');
      this.details.pageIndex = this.page;
    })
    this.disposable.push(sub1,sub2,sub3)
  }


  setArea(value) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['area'] = value;
    this.router.navigate([], {
      queryParams: queryParams,
      relativeTo: this.route
    });

  
  }

  fillElements(route: Route, storage) {
    let startFound = false;
    let endFound = false;

    if (route.segments[0].sections[0].marker.type === 'start') {
      startFound = true;
      storage.push(
        {
          type: 'start',
          element: route.segments[0].sections[0]
        })
    };

    let lastSegment = route.segments[route.segments.length - 1];
    let lastSection = lastSegment.sections[lastSegment.sections.length - 1];
    if (lastSection.marker.type === 'finish') {
      endFound = true;
      storage.push({
        type: 'end',
        element: lastSection
      });
    }

    if (!startFound || !endFound)
      route.segments.some(segment => {
        if (!startFound) {
          segment.sections.some(section => {
            if (section.marker.type === 'start') {
              storage.push({
                type: 'start',
                element: section
              })
              startFound = true;
              return true;
            }
          })
        }
        if (!endFound) {
          segment.sections.some(section => {
            if (section.marker.type === 'finish') {
              storage.push({
                type: 'end',
                element: section
              })
              endFound = true;
              return true;
            }
          })
          if (startFound && endFound) return true;
        }
      })

    route.segments.forEach(segment => {
      storage.splice(storage.length - 1, 0, segment);
    })

    storage.forEach((item,index)=>{
      item['index'] = index;
    })

    return true;
  }

  get mapHidden(){
    return !this.loaded || this.area!=='map';
  }
  get detailsHidden(){
    return !this.loaded || this.area!=='details';
  }

  ngOnDestroy(){
    console.log(this.disposable);
    this.disposable.forEach( sub => {
      sub.unsubscribe();
    })
  }
}


