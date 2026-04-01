import { gql } from '@apollo/client';

export const DELETE_BID = gql`
  mutation DeleteBid($id: Int!) {
    deleteBid(id: $id) {
      id
    }
  }
`;
