import { useState, useEffect } from 'react';
import { Feed, FEED_API_URL } from '@justt/api-interfaces';

export function useFeed(keyword) {
  const [feed, setFeed] = useState<Feed[]>([]);
  useEffect(() => {
    fetch(FEED_API_URL + `?keyword=${keyword}`)
      .then((r) => r.json())
      .then(setFeed);
  }, [keyword]);
  return feed;
}

export default FrontWebsiteDataAccessFeed;
