import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { AuthService } from '../core/services/auth.service';
import { WebApiService } from '../core/services/web-api.service';
import { ApplicationService } from '../core/services/application.service';


@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrls: ['./test-area.component.css']
})
export class TestAreaComponent implements OnInit {

  constructor(private http: Http, 
      private auth: AuthService, 
      private api: WebApiService,
      private app: ApplicationService) { }

  ngOnInit() {
  }


}
