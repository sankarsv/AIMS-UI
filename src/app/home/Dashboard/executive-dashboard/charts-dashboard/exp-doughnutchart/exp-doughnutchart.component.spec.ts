import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpDoughnutchartComponent } from './exp-doughnutchart.component';

describe('ExpDoughnutchartComponent', () => {
  let component: ExpDoughnutchartComponent;
  let fixture: ComponentFixture<ExpDoughnutchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpDoughnutchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpDoughnutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
