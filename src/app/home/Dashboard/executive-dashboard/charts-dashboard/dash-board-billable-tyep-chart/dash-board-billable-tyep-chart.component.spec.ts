import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardBillableTyepChartComponent } from './dash-board-billable-tyep-chart.component';

describe('DashBoardBillableTyepChartComponent', () => {
  let component: DashBoardBillableTyepChartComponent;
  let fixture: ComponentFixture<DashBoardBillableTyepChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardBillableTyepChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardBillableTyepChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
