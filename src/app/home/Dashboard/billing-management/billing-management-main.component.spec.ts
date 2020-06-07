import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingManagementMainComponent } from './billing-management-main.component';

describe('BillingManagementMainComponent', () => {
  let component: BillingManagementMainComponent;
  let fixture: ComponentFixture<BillingManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
