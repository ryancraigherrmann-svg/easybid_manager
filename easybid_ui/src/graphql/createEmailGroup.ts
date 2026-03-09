import { gql } from '@apollo/client';

export const CREATE_EMAIL_GROUP = gql`
  mutation CreateEmailGroup($input: CreateEmailGroupInput!) {
    createEmailGroup(input: $input) {
      id
      name
      company
      emails
      createdAt
      updatedAt
    }
  }
`;
