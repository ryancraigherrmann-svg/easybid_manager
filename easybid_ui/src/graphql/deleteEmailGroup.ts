import { gql } from '@apollo/client';

export const DELETE_EMAIL_GROUP = gql`
  mutation DeleteEmailGroup($id: Int!) {
    deleteEmailGroup(id: $id)
  }
`;
