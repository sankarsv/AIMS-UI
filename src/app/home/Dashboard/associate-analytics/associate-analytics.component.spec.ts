import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateAnalyticsComponent } from './associate-analytics.component';

describe('AssociateAnalyticsComponent', () => {
  let component: AssociateAnalyticsComponent;
  let fixture: ComponentFixture<AssociateAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
