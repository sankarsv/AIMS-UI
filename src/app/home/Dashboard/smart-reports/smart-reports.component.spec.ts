import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartReportsComponent } from './smart-reports.component';

describe('SmartReportsComponent', () => {
  let component: SmartReportsComponent;
  let fixture: ComponentFixture<SmartReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
