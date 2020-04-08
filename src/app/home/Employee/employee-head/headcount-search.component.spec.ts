import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountSearchComponent } from './headcount-search.component';

describe('HeadcountSearchComponent', () => {
  let component: HeadcountSearchComponent;
  let fixture: ComponentFixture<HeadcountSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadcountSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadcountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
