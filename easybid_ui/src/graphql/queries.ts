import { gql } from '@apollo/client';

export const GET_RFPS = gql`
  query GetRFPs {
    rfps {
      id
      currentBids
      title
      description
      jobType
      images
      attributes
      originalCompany
      status
      emailList
      emailGroupId
      emailGroup {
        id
        name
        company
        emails
      }
      startDate
      bidsDueDate
      User
      createdAt
      updatedAt
    }
  }
`;
