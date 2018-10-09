import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCardItemComponent } from './route-card-item.component';

describe('RouteCardItemComponent', () => {
  let component: RouteCardItemComponent;
  let fixture: ComponentFixture<RouteCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
