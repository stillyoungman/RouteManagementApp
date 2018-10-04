import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Segment } from '../../../core/models/segment';

@Component({
  selector: 'segment-filler',
  templateUrl: './segment-filler.component.html',
  styleUrls: ['./segment-filler.component.css']
})
export class SegmentFillerComponent implements OnInit {

  @Input() Element;

  constructor() { }

  ngOnInit() {
  }

  dtChanged(state){
    this.Element.item.isDateRequired = state;
    if(!state){
      this.Element.item.date = undefined;
    }
  }

  ttChanged(state){
    console.log(this.Element.item.travelTime);
    this.Element.item.isTimeRequired = state;
    if(!state){
      this.Element.item.travelTime = undefined;
    }
  }

  change(event){
    console.log(event);
  }



}
