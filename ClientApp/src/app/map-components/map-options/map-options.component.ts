import { Component, OnInit } from '@angular/core';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.css']
})
export class MapOptionsComponent implements OnInit {

  constructor(public ms: MapService) { }

  ngOnInit() {

  }

  get type(){
    // console.log(this.mapService.type);
    return this.ms.markerType;
  }

  changeType(type){
    this.ms.type = type;
  }

}
