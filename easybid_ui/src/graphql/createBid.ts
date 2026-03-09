import { gql } from '@apollo/client';

export const CREATE_BID = gql`
  mutation CreateBid($input: CreateBidInput!) {
    createBid(input: $input) {
      id
      title
      amount
      status
      rfpId
      user
      company
      info
      expectedDate
      lineItems {
        description
        amount
      }
      createdAt
      updatedAt
    }
  }
`;

