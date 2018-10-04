import { Component, OnInit } from '@angular/core';
import { MapService } from '../../core/services/map.service';

@Component({
  selector: 'map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.css']
})
export class MapOptionsComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {

  }

  changeType(type){
    this.mapService.type = type;
  }

}
