import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  @Input() Elements;
  @Input() AsyncElements: Observable<[{}]>;
  @Input() AreaHeight;
  @ViewChild('container') container;

  disposable = [];
  elements;
  elementsLength;
  elementsHeights = [];
  pageIndex;
  pages:PageStorage;
  private _areaHeight;
  private _isActive: boolean;
  private _state = {
    elements: false,
    height: false,
    measured: false,
    pagination: false,
    isReady(){
      return this.elements && this.height && this.measured
    },
    reset(){
      this.height = false,
      this.elements = false
    }
  };

  constructor(private el: ElementRef,
    private route: ActivatedRoute,
    private app: ApplicationService) {
      this.pages = new PageStorage(new Page());
  }

  ngOnInit() {
    if (this.AsyncElements) {
      this.disposable.push(this.AsyncElements.subscribe(elements => {
        this.elements = elements;
        this.elementsLength = elements.length;
        this._state.elements = true;
      }))
    }
    if (this.AreaHeight) {
      this.disposable.push(this.AreaHeight.subscribe(height => {
        this._areaHeight = height;
        this._state.height = true;
      }))
    }
    this.disposable.push(this.app.element$.subscribe(observer => {
      this.elementsHeights.push(observer)
      if (observer.index == this.elementsLength - 1 ){
        this._state.measured = true;
      }
    }))
    
  }

  get isActive() {
    return this._isActive;
  }
  set isActive(value: boolean) {
    this._isActive = value;
    if (value) {
      if (this._state.isReady()) {
        this.setPages();
      } else {
        let t = setTimeout(() => {
          if (!this._state.isReady && this._isActive) {
            //[TODO]: throw Error!! & handle by custom handler
          }
        }, 10000)
        let i = setInterval(() => {
          if (this._state.isReady()) {
            clearInterval(i);
            clearTimeout(t);
            this.setPages();
          }
        }, 500);
      }
    }
  }

  get pgs(){
    if (!this._state.pagination){
      return this.elements;
    } 
    else {
      return this.pages.current.elements;
    }
  }

  private paginate(){
    this.elementsHeights.forEach(item => {
      if(this._areaHeight - this.pages.current.height < 230){
        this.pages.nextPage();
      }
      this.pages.current.addElement(item);
    })
    
    this.pages.rmEmpty();
    if(this.pages.fillPages(this.elements)){
      this._state.pagination = true;
    }
  }


  ngOnDestroy(){
    this.disposable.forEach( sub => {
      sub.unsubscribe();
    })
  }

  private setPages() {
    if(!this.pages.isReady){
      this.paginate();
    } 
    
  }

}

export class Page{ 
  indexes = [];
  elements = [];
  height = 0;

  addElement(item: {height: number; index:number}){
    this.indexes.push(item.index);
    this.height += item.height;
  }
}

export class PageStorage{
  isReady;
  pages:Page[];
  currentPageIndex:number;

  constructor(page:Page){
    this.pages = [];
    this.pages.push(page);
    this.currentPageIndex = 0;
  }

  n(){
    if(this.currentPageIndex < this.length - 1){
      this.currentPageIndex++;
    }
  }
  p(){
    if(this.currentPageIndex > 0){
      this.currentPageIndex--;
    }
  }

  get isPrevious(){
    return !!this.pages[this.currentPageIndex-1];
  }
  get isNext(){
    return !!this.pages[this.currentPageIndex+1];
  }


  nextPage(){
    this.pages.push(new Page());
    this.currentPageIndex++;
  }
  push(item:Page){
    this.pages.push(item);
  }
  fillPages(source:[{index:number}]){
    this.pages.forEach(page => {
      let p = page;
      page.indexes.forEach(index => {
        p.elements.push(source.find((item)=>{
          return item.index == index;
          
        }))
      })
    })
    this.isReady = true;
    this.currentPageIndex = 0;
    return true;
  }
  rmEmpty(){
    let i = -1;
    this.pages.find((page,index) =>{
      if (page.height == 0 ) i = index;
      return page.height == 0;
    })
    if(i !== -1){
      this.pages.splice(i,1);
    }
    
  }
  get current():Page{
    return this.pages[this.currentPageIndex]
  }
  get length(){
    return this.pages.length;
  }

}