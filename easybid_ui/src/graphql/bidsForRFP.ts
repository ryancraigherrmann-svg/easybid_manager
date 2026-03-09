import { gql } from '@apollo/client';

export const GET_BIDS_FOR_RFP = gql`
  query GetBidsForRFP($rfpId: Int!) {
    bidsForRFP(rfpId: $rfpId) {
      id
      title
      amount
      approved
      user
      company
      info
      expectedDate
      lineItems {
        description
        amount
      }
    }
  }
`;
