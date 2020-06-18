import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarityCompareComponent } from './clarity-compare.component';

describe('ClarityCompareComponent', () => {
  let component: ClarityCompareComponent;
  let fixture: ComponentFixture<ClarityCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClarityCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarityCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
