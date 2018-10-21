import { Component, OnInit, Input } from '@angular/core';
import { RouteDto } from 'src/app/core/models/route';

@Component({
  selector: 'route-card-item',
  templateUrl: './route-card-item.component.html',
  styleUrls: ['./route-card-item.component.css']
})
export class RouteCardItemComponent implements OnInit {

  @Input() Route:RouteDto;

  //pipe for 80 characters
  constructor() {
   }

  ngOnInit() {
  }
}
