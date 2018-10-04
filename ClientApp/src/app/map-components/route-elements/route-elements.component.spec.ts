import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteElementsComponent } from './route-elements.component';

describe('RouteElementsComponent', () => {
  let component: RouteElementsComponent;
  let fixture: ComponentFixture<RouteElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
