import { Component, OnInit } from '@angular/core';
import { RouteStorageService } from '../../core/services/route-storage.service';
import { PointElement } from '../../core/models/element';

@Component({
  selector: 'element-card',
  templateUrl: './element-card.component.html',
  styleUrls: ['./element-card.component.css']
})
export class ElementCardComponent implements OnInit {

  private _element;
  constructor(private routeStorage: RouteStorageService) { }

  ngOnInit() {
    this.routeStorage.elementPicked.subscribe( element => {
      this._element = element;
    })
  }

  get type():string{
    if(this._element instanceof PointElement){
      return this._element.item.markerType;
    } else return this._element.type;
  }

  close = () => this._element = null;
}
