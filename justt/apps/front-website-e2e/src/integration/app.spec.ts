import { getfeedearchButton } from '../support/app.po';

describe('gomepage', () => {
  beforeEach(() => cy.visit('/'));

  it('should include feed list feature', () => {
    cy.contains('FrontWebsiteFeatureFeedList');
  });

  it('should display list of feed on search', () => {
    cy.contains('a', 'Some place').within(() => {
      cy.contains('a', 'More details');
    });
    getfeedearchResults().should((t) => expect(t.length).equal(0));
    getfeedearchButton().click();
    getTodos().should((t) => expect(t.length).equal(3));
  });
});
