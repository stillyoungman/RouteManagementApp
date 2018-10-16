import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BagService } from 'src/app/core/services/bag.service';
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

  d;
  d1;
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
    private bag: BagService,
    private route: ActivatedRoute,
    private app: ApplicationService) {
      this.pages = new PageStorage(new Page());
  }

  ngOnInit() {
    if (this.AsyncElements) {
      console.log("d");
      this.disposable.push(this.AsyncElements.subscribe(elements => {
        this.elements = elements;
        // this.reversed = elements.reverse();
        this.elementsLength = elements.length;
        this._state.elements = true;
      }))
    }
    if (this.AreaHeight) {
      console.log("d1")
      this.disposable.push(this.AreaHeight.subscribe(height => {
        this._areaHeight = height;
        this._state.height = true;
      }))
    }
    this.disposable.push(this.app.element$.subscribe(observer => {
      this.elementsHeights.push(observer)
      if (observer.index == this.elementsLength - 1 ){
        this._state.measured = true;
        // console.log(this.elementsHeights);
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
    // console.log(Date.now(),this._state.pagination.toString())
    if (!this._state.pagination){
      return this.elements;
    } 
    else {
      console.log("else branch ", this._state.pagination)
      return this.pages.current.elements;
    }
  }

  private paginate(){
    console.log(this.elements);
    console.log("arHeight, curren.het",this._areaHeight,this.pages.current.height)
    // console.log()
    this.elementsHeights.forEach(item => {
      console.log('forEach elementsHeights');
      if(this._areaHeight - this.pages.current.height < 230){
        this.pages.nextPage();
      }
      console.log("current",this.pages)
      this.pages.current.addElement(item);
    })
    console.log("elements heights",this.elementsHeights);
    
    this.pages.rmEmpty();
    console.log("elements", this.elements);
    if(this.pages.fillPages(this.elements)){
      this._state.pagination = true;
    }
    
    console.log("Pages: ",this.pages);
  }


  ngOnDestroy(){
    // this.app.element$.unsubscribe();
    this.disposable.forEach( sub => {
      sub.unsubscribe();
    })
    console.log("d", this.disposable);
    // this.AreaHeight.unsubscribe();
    console.log("RD is destoried)")
    
    console.log(this.AsyncElements); 
    // this.AsyncElements.unsubscribe();
    // this.AreaHeight.unsubscribe();
  }

  private setPages() {
    console.log("PAGE SETS");
    if(this.pages.isReady){

    } else {
      this.paginate();
    }
    
  }

  // private continuePagination(item: {height:number;index:number}){
  //   if(this.reversed.length){
  //     if(this._areaHeight - this.pages.current.height > 190){//if there is free space
  //       this.pages.current.elements.push(this.reversed.pop());
  //     } else {
  //       this.pages.addNext();
  //       this.pages.current.elements.push(this.reversed.pop())
  //     }
  //   }
  // }

}

export class Page{ 
  indexes = [];
  elements = [];
  height = 0;

  addElement(item: {height: number; index:number}){
    console.log("AddItem", this);

    this.indexes.push(item.index);
    this.height += item.height;
    console.log(this);
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


  nextPage(){
    this.pages.push(new Page());
    this.currentPageIndex++;
  }
  push(item:Page){
    this.pages.push(item);
  }
  fillPages(source:[{index:number}]){
    console.log("pages",this.pages)
    this.pages.forEach(page => {
      let p = page;
      page.indexes.forEach(index => {
        p.elements.push(source.find((item)=>{
          console.log("index ", item.index)
          return item.index == index;
          
        }))
      })
      console.log("Page23423434", p); 
    })
    this.isReady = true;
    this.currentPageIndex = 0;
    return true;
  }
  rmEmpty(){
    let i = -1;
    console.log("REMOVE!!"); 
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