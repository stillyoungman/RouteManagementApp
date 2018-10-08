///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
//import { } from '@types/googlemaps';
import { Injectable, EventEmitter } from '@angular/core';
import { RouteStorageService } from './route-storage.service';
import { Marker } from '../models/marker';
import { Section } from '../models/section';
import { Http } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  directionsService: google.maps.DirectionsService;
  latitude = 56.126838;
  longitude = 40.397072;
  followRoad = true;
  
  private _map: google.maps.Map;
  private _markerType = "start";
  
  private _finished = false;
  private _started = false;

  elementCreated = new EventEmitter(true);
  isRouteFinishedEvent = new EventEmitter();

  constructor(private routeStorage: RouteStorageService) {
    this.directionsService = new google.maps.DirectionsService();
   }
  
  public initMap(map?: google.maps.Map) {
   
    if(!this._map) { 
      this._map = map;
      this.routeStorage.init(map);
     }
    else { this._map.setOptions(this.mapOptions) }
    
    this._map.addListener('click', (event) => {
      this.addMarker(event);
    });
  }
  public reset(){
    this.followRoad = true;
    this._finished = false;
    this._markerType = "start";
    this._started = false;
    this.routeStorage.reset();
  }
  public clearMap(){
    this.routeStorage.clear();
    this.reset();
    this.initMap();
  }
  private addMarker(event) {
    var location: google.maps.LatLng = event.latLng;

    let marker = new Marker(`Point #${this.routeStorage.markers.pointCounter}`, location, this._markerType);
    this.populateMarker(marker);

    //possibly not necessary 
    this.routeStorage.markers.push(marker);

    if (this._markerType !== "start") {
      let section = new Section(marker, this.polylineOptions);

      //if markerType == checkpoint of finish
      if(this._markerType !== "inter"){
        this.routeStorage.segments.pushSection(section);
        this.elementCreated.emit(this.routeStorage.segments.last);

        if (this._markerType === "finish") {
          google.maps.event.clearListeners(this._map, 'click');
          this._map.setOptions({ draggableCursor: 'auto' });
          this._finished = true;
          this.isRouteFinishedEvent.emit(true);
        }
        else {
          this._markerType = "inter";
          this.routeStorage.segments.addNext();
        }
      }
      else {
        this.routeStorage.segments.pushSection(section);
      }
      this.populateSection();
    }
    else {
      this.routeStorage.segments.pushSection(new Section(marker));
      this.elementCreated.emit(this.routeStorage.segments.lastSection);
      this._started = true;
      this._markerType = "inter";
    }
  }
  private populateMarker(marker: Marker) {
    var opt: google.maps.MarkerOptions = {
      map: this._map,
      position: marker.location,
      icon: this.icon,
    };
    marker.setGoogleInstance(opt);
  }
  private populateSection() {
    if (this.followRoad) this.setRoad();
    else this.setLine();
  }
  private setRoad() {
    var request = {
      origin: this.routeStorage.segments.penultSection.marker.location,
      destination: this.routeStorage.segments.lastSection.marker.location,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING,
    };

    this.directionsService.route(request, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK && response) {
        this.routeStorage.segments.lastSection
          .setPath(response.routes[0].overview_path)  //array of coords
          .setDistance(response.routes[0].legs[0].distance.value)
          .show();
      }
      // if (status == google.maps.DirectionsStatus.OK && response) {
      //   this.viewData.sectionStorage.last
      //     .setPath(response.routes[0].overview_path)  //array of coords
      //     .setDistance(response.routes[0].legs[0].distance.value)
      //     .show();
      //   console.log(this.viewData.sectionStorage.last);
      //   console.log(response);
      // }
    });

  }
  private setLine() {
    // this.viewData.sectionStorage.last
    //   .setPath([
    //     this.viewData.markerStorage.penult.location,
    //     this.viewData.markerStorage.last.location
    //   ]).show()
      
  }
  

  //very bad practice!!!! dont do this again! (i need some sleep)
  public get markerType(){
    return this._markerType;
  }
  public set type(value){
    this._markerType = value;
  }
  public get isStarted(){
    return this._started;
  }
  public get isFinished(){
    return this._finished;
  }
  public get map(){
    return this._map;
  }
  public get mapOptions(): google.maps.MapOptions {
    return {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      scrollwheel: true,
      draggableCursor: 'crosshair',
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
    }
  }
  public get polylineOptions(): google.maps.PolylineOptions {
    return {
      strokeColor: "#E67E22",
      map: this._map,
      strokeWeight: 5,
      strokeOpacity: 0.7,
    }
  }
  public get icon() {
    switch (this._markerType) {
      case "inter": return this.interIcon;
      case "checkpoint": return this.checkpointIcon;
      case "finish": return this.finishIcon;
      case "start": return this.startIcon;//event for change switch-button color
    }
  }
  interIcon = {
    url: "../../../assets/img/interPoint.png",
    anchor: new google.maps.Point(10, 22),
    // anchor: new google.maps.Point(10, 25),
  };
  checkpointIcon = {
    url: "../../../assets/img/checkpoint.png",
    anchor: new google.maps.Point(15, 23),
    // anchor: new google.maps.Point(10, 25),
  };
  finishIcon = {
    url: "../../assets/img/redFlag.png",
    size: new google.maps.Size(20, 20),
    anchor: new google.maps.Point(3, 20),
  }; 
  startIcon = {
    url: "../../../assets/img/greenFlag.png",
    size: new google.maps.Size(20, 20),
    anchor: new google.maps.Point(3, 20),
  };
}
