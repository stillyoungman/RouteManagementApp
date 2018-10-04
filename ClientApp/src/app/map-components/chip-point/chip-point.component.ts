import { Component, OnInit, Input } from '@angular/core';
import { IElement } from '../../core/interfaces/IElement';
import { PointElement, SegmentElement } from '../../core/models/element';
import { Segment } from '../../core/models/segment';

@Component({
  selector: 'chip-point',
  templateUrl: './chip-point.component.html',
  styleUrls: ['./chip-point.component.css']
})
export class ChipPointComponent implements OnInit {
  
  @Input() Point: PointElement;

  constructor() {

   }
  
  ngOnInit() {
  }

  // isStartOrEnd():boolean{
  //   return this.Point.isStartOrEnd();
  // }

  get type():string{
    if (this.Point instanceof SegmentElement){
      return "checkpoint";
    }
    return this.Point.item.markerType;
  }

}
