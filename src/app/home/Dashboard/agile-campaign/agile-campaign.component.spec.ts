import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgileCampaignComponent } from './agile-campaign.component';

describe('AgileCampaignComponent', () => {
  let component: AgileCampaignComponent;
  let fixture: ComponentFixture<AgileCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgileCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgileCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
