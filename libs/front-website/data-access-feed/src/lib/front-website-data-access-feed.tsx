import { useState, useEffect } from 'react';
import axios from 'axios';

import { TransactionWithCustomer, FEED_API_URL } from '@justt/api-interfaces';

const findBy = async (searchString: string) =>
  await axios.get(
    `${FEED_API_URL}?searchString=${searchString}&take=40&skip=0&orderBy=asc`
  );

export function useFeed(searchString: string) {
  const [feed, setFeed] = useState<TransactionWithCustomer[]>([]);
  useEffect(() => {
    findBy(searchString).then((value) => {
      setFeed(value.data);
    });
  }, [searchString]);
  return feed;
}

export const feedApi = {
  useFeed,
};

export default useFeed;
