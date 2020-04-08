import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceMonitoringComponent } from './compliance-monitoring.component';

describe('ComplianceMonitoringComponent', () => {
  let component: ComplianceMonitoringComponent;
  let fixture: ComponentFixture<ComplianceMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
