import { gql } from '@apollo/client';

export const UPDATE_EMAIL_GROUP = gql`
  mutation UpdateEmailGroup($id: Int!, $input: CreateEmailGroupInput!) {
    updateEmailGroup(id: $id, input: $input) {
      id
      name
      company
      emails
      createdAt
      updatedAt
    }
  }
`;
