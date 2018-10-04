import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointFillerComponent } from './point-filler.component';

describe('PointFillerComponent', () => {
  let component: PointFillerComponent;
  let fixture: ComponentFixture<PointFillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointFillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
