import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardLocationWiseChartComponent } from './dash-board-location-wise-chart.component';

describe('DashBoardLocationWiseChartComponent', () => {
  let component: DashBoardLocationWiseChartComponent;
  let fixture: ComponentFixture<DashBoardLocationWiseChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardLocationWiseChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardLocationWiseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
