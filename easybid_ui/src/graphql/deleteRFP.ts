import { gql } from '@apollo/client';

export const DELETE_RFP = gql`
  mutation DeleteRFP($id: Int!) {
    deleteRFP(id: $id) {
      id
    }
  }
`;
