import { useState, useEffect } from 'react';
import { Feed } from '@justt/api-interfaces';

export function useFeed() {
  const [feed, setFeed] = useState<Feed[]>([]);
  useEffect(() => {
    fetch('/api/hotes')
      .then((r) => r.json())
      .then(setFeed);
  }, []);
  return games;
}

export default FrontWebsiteDataAccessFeed;
