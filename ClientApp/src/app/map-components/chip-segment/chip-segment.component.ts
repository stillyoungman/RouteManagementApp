import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { SegmentElement, PointElement } from '../../core/models/element';

@Component({
  selector: 'chip-segment',
  templateUrl: './chip-segment.component.html',
  styleUrls: ['./chip-segment.component.css']
})
export class ChipSegmentComponent implements OnInit {

  @Input() Segment: SegmentElement;
  @Input() Emitter: EventEmitter<{}>; 
  isFinish:boolean;

  constructor() {
  
  }

  ngOnInit() {
    this.isFinish = this.Segment.item.last.markerType == "finish";
  }

  picked(type){
    switch(type){
      case 'segment': {
        this.Emitter.emit(this.Segment);
        break;
      }
      case 'checkpoint': {
        console.log(this.checkpoint);
        this.Emitter.emit(this.checkpoint);
        break;
      }
    }
  }

  get checkpoint(){

    return new PointElement(this.Segment.item.last, 'checkpoint');

    // return {
    //   type: 'checkpoint',
    //   item: this.Segment.item
    // };
  }

}
