import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/core/models/section';
import { Marker } from 'src/app/core/models/marker';

@Component({
  selector: 'point-details',
  templateUrl: './point-details.component.html',
  styleUrls: ['./point-details.component.css']
})
export class PointDetailsComponent implements OnInit {

  @Input() Element:Marker
  point;

  constructor() { 
    
  }

  ngOnInit() {
  }

}
