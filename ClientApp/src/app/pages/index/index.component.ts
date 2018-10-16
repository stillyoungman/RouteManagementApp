import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private app: ApplicationService) { }

  ngOnInit() {
    console.log(window.innerHeight);
    document.body.className = "back-img";
  }
  ngOnDestroy(){
    document.body.className = "";
  }

  go(){
    this.app.redirectTo("create-route");
  }
}
