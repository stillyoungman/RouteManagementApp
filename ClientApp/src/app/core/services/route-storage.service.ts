///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Injectable, EventEmitter } from '@angular/core';
import { MarkerStorage } from '../models/markerStorage';
import { SegmentStorage } from '../models/segmentStorage';
import { IElement } from '../interfaces/IElement';
import { Route } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteStorageService {

  map: google.maps.Map;
  markers: MarkerStorage;
  segments: SegmentStorage;
  bounds = new google.maps.LatLngBounds();

  _elements;
  elementPicked = new EventEmitter();
  zoom;

  constructor() {
    this._elements = [];
  }
  public reset() {
    this._elements = [];
    this.markers = new MarkerStorage();
    this.segments = new SegmentStorage(this.map);
    this.bounds = new google.maps.LatLngBounds();
  }

  get elements() {
    return this._elements;
  }


clear(){
  this.segments.clear();
}

get path(){
  return this.segments.path;
}

get route() {
  let route = new Route(this.segments.segments, this.bounds);
  route.name = "My Route";
  route['zoom'] = this.zoom;
  return route;
}

get checkpointsLocations(){
  let arr = [];
  this.segments.segments.forEach(segment => {
    if (segment.last.markerType === 'checkpoint') { 
      let location = segment.last.marker.location.toString().split(' ').join('')
      location = location.slice(1, location.length-1);
      arr.push(location);
    }  
  })
  return arr;
}

get points(){
  let result = {};
  result['start'] = this.segments.segments[0].sections[0].marker.location.toString().split(' ').join('')
  result['start'] = result['start'].slice(1, result['start'].length-1);
  result['end'] = this.segments.last.last.marker.location.toString().split(' ').join('')
  result['end'] = result['end'].slice(1, result['end'].length-1);
  return result;
}

init(map: google.maps.Map) {
  this.map = map;
  this.markers = new MarkerStorage();
  this.segments = new SegmentStorage(map);
}
}


