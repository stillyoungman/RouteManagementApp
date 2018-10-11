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

  submit(){
    var header = new Headers();
    // headers.append();
    // headers.set("x-xcustom-header","valueOfCustomHeader");
    // let opt = {
    //   headers:headers
    // }
    // let options = new RequestOptions(opt);
    // header.set("x-noname-header","sfddfg");
    // console.log(header);
    // this.http.get("/",new RequestOptions({headers:this.auth.tokenHeader})).subscribe();
  }

  getToken(){
    this.api._debugGetToken({
      uid: 2341,
      name: "Kyle Lebowski",
      email: "test@email.com",
    });
  }

  setQuery(){
    this.app.router.navigate(['/test'],{ queryParams: { key:"value", 'some':234}});
  }

  send(){
    this.auth.authenticate({email: "email@gmail.com", password: "12334456234"});
  }
}
