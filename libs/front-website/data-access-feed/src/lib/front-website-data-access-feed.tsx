import { map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { useState, useEffect } from 'react';

import { Subject, timer, zip } from 'rxjs';
import axios from 'axios';

import { TransactionWithCustomer, FEED_API_URL } from '@justt/api-interfaces';

const subject = new Subject();

const initialState = {
  status: '',
  data: [],
  newDataCount: 0,
  error: '',
};

let state = initialState;

export const chatStore = {
  init: () => {
    state = { ...state, newDataCount: 0 };
    subject.next(state);
  },
  subscribe: (setState) => subject.subscribe(setState),
  sendMessage: (message) => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1,
    };
    subject.next(state);
  },
  clearChat: () => {
    state = initialState;
    subject.next(state);
  },
  initialState,
  fetch: () => {
    console.log('fetching');
  },
};

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

export const fetchFeed = (searchString: string) => {
  const url = `${FEED_API_URL}?searchString=${searchString}&take=40&skip=0&orderBy=asc`;
  // wait for both fetch and a 500ms timer to finish
  return zip(
    fromFetch(url).pipe(switchMap((value) => value.json())),
    timer(500) // set a timer for 500ms
  ).pipe(
    // then take only the first value (fetch result)
    map(([data]) => data)
  );
};

export const feedApi = {
  useFeed,
  findBy,
  chatStore,
};

export default useFeed;
