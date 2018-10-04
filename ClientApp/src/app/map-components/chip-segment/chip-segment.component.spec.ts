import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipSegmentComponent } from './chip-segment.component';

describe('ChipSegmentComponent', () => {
  let component: ChipSegmentComponent;
  let fixture: ComponentFixture<ChipSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
