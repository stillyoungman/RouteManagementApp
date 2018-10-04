import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentFillerComponent } from './segment-filler.component';

describe('SegmentFillerComponent', () => {
  let component: SegmentFillerComponent;
  let fixture: ComponentFixture<SegmentFillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentFillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
