import styled from '@emotion/styled';
import { TransactionWithCustomer } from '@justt/api-interfaces';

const StyledFrontWebsiteFeatureFeedList = styled.div`
  color: black;
  with: 80%;
  max-width: 500px;
  margin: 0 auto;
  padding: 3rem;
`;
const NameStyled = styled.span`
  padding-right: 5rem;
`;

/* eslint-disable-next-line */
export interface FrontWebsiteFeatureFeedListProps {
  feed: TransactionWithCustomer[];
}

export function FrontWebsiteFeatureFeedList(
  props: FrontWebsiteFeatureFeedListProps
) {
  const { feed } = props;
  return (
    <StyledFrontWebsiteFeatureFeedList>
      <table>
        {Array.isArray(feed) &&
          feed.map((transaction) => (
            <tr key={transaction.id}>
              <td align="left">
                <NameStyled>{`${transaction.customer.firstName} ${transaction.customer.lastName}`}</NameStyled>
              </td>
              <td align="right">
                <strong>{transaction.price}</strong>
              </td>
              <td>
                <small>{transaction.currency}</small>
              </td>
            </tr>
          ))}
      </table>
    </StyledFrontWebsiteFeatureFeedList>
  );
}

export default FrontWebsiteFeatureFeedList;
