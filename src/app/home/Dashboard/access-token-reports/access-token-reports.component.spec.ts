import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTokenReportsComponent } from './access-token-reports.component';

describe('AccessTokenReportsComponent', () => {
  let component: AccessTokenReportsComponent;
  let fixture: ComponentFixture<AccessTokenReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessTokenReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessTokenReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
