import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MapService } from '../core/services/map.service';

@Component({
  selector: 'layout-content',
  templateUrl: './layout-content.component.html',
  styleUrls: ['./layout-content.component.css']
})
export class LayoutContentComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private ms: MapService) { }

  ngOnInit() {
  }

  routeChanged(){
    this.auth.errorMessage = undefined;
    this.ms.reset();
  }

}
