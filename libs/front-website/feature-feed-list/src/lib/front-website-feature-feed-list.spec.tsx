import { render } from '@testing-library/react';

import FrontWebsiteFeatureFeedList from './front-website-feature-feed-list';

describe('FrontWebsiteFeatureFeedList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontWebsiteFeatureFeedList />);
    expect(baseElement).toBeTruthy();
  });
});
