import styled from '@emotion/styled';

import { FrontWebsiteFeatureFeedList as FeedList } from '@justt/front-website/feature-feed-list';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: pink;
`;

export function Home(props: HomeProps) {
  return (
    <StyledHome>
      <FeedList />
    </StyledHome>
  );
}

export default Home;
