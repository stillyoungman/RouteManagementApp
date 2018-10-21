import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Segment } from 'src/app/core/models/segment';

@Component({
  selector: 'segment-details',
  templateUrl: './segment-details.component.html',
  styleUrls: ['./segment-details.component.css']
})
export class SegmentDetailsComponent implements OnInit {

  @Input() Element:Segment;
  @ViewChild('wrap') wrapRef;
  checkpoint;

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.checkpoint = this.Element.last.marker;
  }

  click(item){
    console.log(this.wrapRef.nativeElement.offsetHeight);
  }

}
