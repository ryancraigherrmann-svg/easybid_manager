import { gql } from '@apollo/client';

export const UPDATE_BID = gql`
  mutation UpdateBid($id: Int!, $input: UpdateBidInput!) {
    updateBid(id: $id, input: $input) {
      id
      amount
      approved
    }
  }
`;
