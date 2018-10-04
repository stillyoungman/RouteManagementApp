import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(window.innerHeight);
    document.body.className = "back-img";
  }
  ngOnDestroy(){
    document.body.className = "";
  }

}
