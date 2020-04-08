import { AIMSPage } from './app.po';

describe('aims App', function() {
  let page: AIMSPage;

  beforeEach(() => {
    page = new AIMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
