///<reference path="/Users/constantine/Workspace/Repository/dotnet/RouteManagementApp/ClientApp/node_modules/@types/googlemaps/index.d.ts" />
// import { } from '@types/googlemaps';
import { Injectable, EventEmitter } from '@angular/core';
import { MarkerStorage } from '../models/markerStorage';
import { SegmentStorage } from '../models/segmentStorage';
import { IElement } from '../interfaces/IElement';

@Injectable({
  providedIn: 'root'
})
export class RouteStorageService {

  map: google.maps.Map;
  markers: MarkerStorage;
  segments: SegmentStorage;

  _elements;
  elementPicked = new EventEmitter();

  constructor() {
    this._elements = [];
  }
  public reset(){
    this._elements = [];
    this.markers = new MarkerStorage();
    this.segments = new SegmentStorage(this.map);
  }

  get elements() {
    return this._elements;
  }

  init(map: google.maps.Map) {
    this.map = map;
    this.markers = new MarkerStorage();
    this.segments = new SegmentStorage(map);
  }
}


