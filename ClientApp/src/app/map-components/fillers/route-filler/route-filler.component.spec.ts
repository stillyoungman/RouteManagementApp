import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFillerComponent } from './route-filler.component';

describe('RouteFillerComponent', () => {
  let component: RouteFillerComponent;
  let fixture: ComponentFixture<RouteFillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteFillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
