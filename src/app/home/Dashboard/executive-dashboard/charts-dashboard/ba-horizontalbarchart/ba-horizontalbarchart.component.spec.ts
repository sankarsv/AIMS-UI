import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaHorizontalbarchartComponent } from './ba-horizontalbarchart.component';

describe('BaHorizontalbarchartComponent', () => {
  let component: BaHorizontalbarchartComponent;
  let fixture: ComponentFixture<BaHorizontalbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaHorizontalbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaHorizontalbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
