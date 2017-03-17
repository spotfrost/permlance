import { JobportalfrontendPage } from './app.po';

describe('jobportalfrontend App', function() {
  let page: JobportalfrontendPage;

  beforeEach(() => {
    page = new JobportalfrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
