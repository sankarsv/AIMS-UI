import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadreportsComponent } from './uploadreports.component';

describe('UploadreportsComponent', () => {
  let component: UploadreportsComponent;
  let fixture: ComponentFixture<UploadreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
