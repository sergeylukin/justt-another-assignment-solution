import { useState, useEffect } from 'react';
import axios from 'axios';

import { Transaction, FEED_API_URL } from '@justt/api-interfaces';

const findBy = async (keyword: string) =>
  await axios.get(`${FEED_API_URL}?keyword=${keyword}`);

export function useFeed(keyword) {
  const [feed, setFeed] = useState<Transaction[]>([]);
  useEffect(() => {
    findBy(keyword)
      .then((r) => r.json())
      .then(setFeed);
  }, [keyword]);
  return feed;
}

export const feedApi = {
  useFeed,
};

export default useFeed;
