//<reference path="C:/_repos/routemanagementapp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
import { } from '@types/googlemaps';
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


get route() {
  let route = new Route(this.segments.segments, this.bounds);
  route.name = "My Route";
  route['zoom'] = this.zoom;
  return route;
}



init(map: google.maps.Map) {
  this.map = map;
  this.markers = new MarkerStorage();
  this.segments = new SegmentStorage(map);
}
}


