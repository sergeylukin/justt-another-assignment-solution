import { render } from '@testing-library/react';

import FrontWebsiteDataAccessFeed from './front-website-data-access-feed';

describe('FrontWebsiteDataAccessFeed', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontWebsiteDataAccessFeed />);
    expect(baseElement).toBeTruthy();
  });
});
