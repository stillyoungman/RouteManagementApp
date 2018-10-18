import { Component, OnInit, EventEmitter } from '@angular/core';
import { MapService } from '../../core/services/map.service';
import { RouteStorageService } from '../../core/services/route-storage.service';
import { IElement } from '../../core/interfaces/IElement';
import { PointElement, SegmentElement } from '../../core/models/element';
import { Segment } from '../../core/models/segment';
import html2canvas from 'html2canvas';
import { WebApiService } from 'src/app/core/services/web-api.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'route-elements',
  templateUrl: './route-elements.component.html',
  styleUrls: ['./route-elements.component.css']
})
export class RouteElementsComponent implements OnInit {

  private elements;
  private pickEmitter: EventEmitter<{}>;
  private mapImgRef;

  constructor(private routeStorage: RouteStorageService,
    private mapService: MapService,
    private api: WebApiService,
    private nf: NotificationService) {
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

  print() {

    if (this.mapImgRef && this.mapImgRef.length < 8191) {
      let link = document.createElement('a');
      link.setAttribute('href', this.mapImgRef);
      link.setAttribute('download', 'route-snapshot.png');
      link.setAttribute('target', '_blank');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (this.mapImgRef.length < 8191) {
      this.nf.notify("Can't print (too long)");
    }
  }

  elementCreatedHandler(element) {
    if (element instanceof (Segment)) {
      this.elements.push(new SegmentElement(element));
      if (element.last.marker.type === "finish") {
        this.elements.push(new PointElement(element.last));
        try { //creating mapImgRef
          let count = 0;
          let i = setInterval(() => {
            if (this.routeStorage.segments.last.last.markerType === 'finish' || count > 6) {
              clearInterval(i);
              this.mapImgRef = this.api.staticMapRequest;
            }
          }, 1000)
        } catch {
          console.log("rel#87")
        }

      }
    } else if (element.marker.type === "start") {
      this.elements.push(new PointElement(element));
      this.mapImgRef = '';
    }
    console.log(element);
  }

}
