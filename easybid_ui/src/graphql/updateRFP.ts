import { gql } from '@apollo/client';

export const UPDATE_RFP = gql`
  mutation UpdateRFP($id: Int!, $input: UpdateRFPInput!) {
    updateRFP(id: $id, input: $input) {
      id
      emailList
      emailGroupId
    }
  }
`;
