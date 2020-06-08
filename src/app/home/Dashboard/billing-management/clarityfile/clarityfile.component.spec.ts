import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityfileComponent } from './clarityfile.component';

describe('ClarityfileComponent', () => {
  let component: ClarityfileComponent;
  let fixture: ComponentFixture<ClarityfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClarityfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarityfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
