import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipPointComponent } from './chip-point.component';

describe('ChipPointComponent', () => {
  let component: ChipPointComponent;
  let fixture: ComponentFixture<ChipPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
