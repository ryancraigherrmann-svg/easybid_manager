import { gql } from '@apollo/client';

export const UPDATE_RFP_STATUS = gql`
  mutation UpdateRFPStatus($id: Int!, $status: Int!) {
    updateRFPStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
