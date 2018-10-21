import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoutesComponent } from './my-routes.component';

describe('MyRoutesComponent', () => {
  let component: MyRoutesComponent;
  let fixture: ComponentFixture<MyRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
