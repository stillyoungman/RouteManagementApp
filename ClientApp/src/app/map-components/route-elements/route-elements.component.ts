import { Component, OnInit, EventEmitter } from '@angular/core';
import { MapService } from '../../core/services/map.service';
import { RouteStorageService } from '../../core/services/route-storage.service';
import { IElement } from '../../core/interfaces/IElement';
import { PointElement, SegmentElement } from '../../core/models/element';
import { Segment } from '../../core/models/segment';

@Component({
  selector: 'route-elements',
  templateUrl: './route-elements.component.html',
  styleUrls: ['./route-elements.component.css']
})
export class RouteElementsComponent implements OnInit {

  private elements;
  private pickEmitter: EventEmitter<{}>;

  constructor(private routeStorage: RouteStorageService, private mapService: MapService) {

  }

  ngOnInit() {
    this.elements = this.routeStorage.elements;
    this.pickEmitter = this.routeStorage.elementPicked;

    this.mapService.elementCreated.subscribe(element => {
      this.elementCreatedHandler(element);
    })
  }

  isStarted(): boolean {
    return this.mapService.isStarted;
  }
  get isFinished() {
    return this.mapService.isFinished;
  }

  fillRoute() {
    this.routeStorage.elementPicked.emit(this.routeStorage.route);
  }

  clearMap() {
    this.mapService.clearMap();
    this.elements = this.routeStorage.elements;
    this.routeStorage.elementPicked.emit(undefined);
  }

  picked(element) {
    this.routeStorage.elementPicked.emit(element);
  }

  elementCreatedHandler(element) {
    if (element instanceof (Segment)) {
      this.elements.push(new SegmentElement(element));
      if (element.last.marker.type === "finish") {
        this.elements.push(new PointElement(element.last));
      }
    } else if (element.marker.type === "start") {
      this.elements.push(new PointElement(element));
    }
    console.log(element);
  }

}
