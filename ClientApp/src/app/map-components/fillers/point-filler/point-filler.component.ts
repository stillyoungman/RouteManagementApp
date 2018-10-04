import { Component, OnInit, Input } from '@angular/core';
import { PointElement } from 'src/app/core/models/element';

@Component({
  selector: 'point-filler',
  templateUrl: './point-filler.component.html',
  styleUrls: ['./point-filler.component.css']
})
export class PointFillerComponent implements OnInit {

  @Input() Element:PointElement;

  constructor() { }

  ngOnInit() {
  }

  get isStartOrEnd(){
    return this.Element.isStartOrEnd();
  }

  rtChanged(state){
    this.Element.marker.isRestRequired = state;
    if(!state){
      this.Element.marker.rest = undefined;
    }
  }

  dtChanged(state){
    this.Element.marker.isDateRequired = state;
    if(!state){
      this.Element.marker.date = undefined;
    }
  }



}
