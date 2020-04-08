import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueMonitoringComponent } from './revenue-monitoring.component';

describe('RevenueMonitoringComponent', () => {
  let component: RevenueMonitoringComponent;
  let fixture: ComponentFixture<RevenueMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
