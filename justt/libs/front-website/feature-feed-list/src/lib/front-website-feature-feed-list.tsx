import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FrontWebsiteFeatureFeedListProps {}

const StyledFrontWebsiteFeatureFeedList = styled.div`
  color: pink;
`;

export function FrontWebsiteFeatureFeedList(
  props: FrontWebsiteFeatureFeedListProps
) {
  return (
    <StyledFrontWebsiteFeatureFeedList>
      <h1>Welcome to FrontWebsiteFeatureFeedList!</h1>
    </StyledFrontWebsiteFeatureFeedList>
  );
}

export default FrontWebsiteFeatureFeedList;
