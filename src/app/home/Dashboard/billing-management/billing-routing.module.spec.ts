import { BillingRoutingModule } from './billing-routing.module';

describe('BillingRoutingModule', () => {
  let billingRoutingModule: BillingRoutingModule;

  beforeEach(() => {
    billingRoutingModule = new BillingRoutingModule();
  });

  it('should create an instance', () => {
    expect(billingRoutingModule).toBeTruthy();
  });
});
