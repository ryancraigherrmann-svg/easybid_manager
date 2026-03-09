import { gql } from '@apollo/client';

export const GET_EMAIL_GROUPS = gql`
  query EmailGroups($company: String) {
    emailGroups(company: $company) {
      id
      name
      company
      emails
      createdAt
      updatedAt
    }
  }
`;
