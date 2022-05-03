import { Route } from 'react-router-dom';

import { FrontWebsiteFeatureFeedList as FeedList } from '@justt/front-website/feature-feed-list';

export function App() {
  return <Route path="/" exact render={() => <FeedList />} />;
}

export default App;
