import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillablePiechartComponent } from './billable-piechart.component';

describe('BillablePiechartComponent', () => {
  let component: BillablePiechartComponent;
  let fixture: ComponentFixture<BillablePiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillablePiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillablePiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
