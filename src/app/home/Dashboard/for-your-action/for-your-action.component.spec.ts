import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForYourActionComponent } from './for-your-action.component';

describe('ForYourActionComponent', () => {
  let component: ForYourActionComponent;
  let fixture: ComponentFixture<ForYourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForYourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForYourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
