import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeBarchartComponent } from './trainee-barchart.component';

describe('TraineeBarchartComponent', () => {
  let component: TraineeBarchartComponent;
  let fixture: ComponentFixture<TraineeBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
