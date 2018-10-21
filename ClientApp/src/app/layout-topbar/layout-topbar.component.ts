import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApplicationService } from '../core/services/application.service';
import { AuthService } from '../core/services/auth.service';
import { Subject } from 'rxjs';
import { MapService } from '../core/services/map.service';
// import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'layout-topbar',
  templateUrl: './layout-topbar.component.html',
  styleUrls: ['./layout-topbar.component.css']
})
export class LayoutTopbarComponent implements OnInit {

  searchInput;
  url;
  disposable = [];
  inputReady;
  @ViewChild('topbar') topbar;

  constructor(private app: ApplicationService,
    private authService: AuthService,
    private router: Router,
    private mapService: MapService) {
      this.inputReady = new Subject();
     }

  ngOnInit() {
    this.disposable.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if(this.url === '/create-route') {
          this.searchInput = undefined;
          this.setInput(this.searchInput, this.inputReady);
        }
        else {
          // this.disposable[1].unsubscribe();
          this.mapService.resetAutocomplete();
        }
      }
    }))
    this.disposable.push(this.inputReady.subscribe((input)=>{
      this.mapService.initAutocomplete(input);
    }))
  }

  logoLink() {
    if (this.app.url === "/") this.app.router.navigate(["/create-route"])
    else if (this.app.url === "/create-account" || this.app.url === "/login") this.app.back();
    else this.app.router.navigate(["/"]);
  }

  private get isSearchRequired() {
    return this.url === "/create-route" || this.url === "/my-routes";
  }

  searchKeyup(value) {
    this.app.search$.next(value);
  }

  async setInput(input, subject){
    if (this.url === '/create-route') {
      // let input;
      let count = 0;
      let i = setInterval(() => {
        count++;
        if (input || count > 30) {
          clearInterval(i)
          subject.next(input)
          // console.log(input);
        } else {
          try {
            input = Array.from(Array.from(Array.from(this.topbar.nativeElement.children)
            .filter(el => el['className'] === 'search-wrapper'))[0]['children'])
            .filter(el => el['tagName'] === 'INPUT')[0];
          }
          catch {
            console.log("ltc1");
          }
          
        }
      }, 200)
      
    }
  }

  ngAfterViewInit() {
    // console.log(this.topbar.nativeElement.children);
    
  }

  ngOnDestroy(){
    this.disposable.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
