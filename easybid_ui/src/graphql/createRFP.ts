import { gql } from '@apollo/client';

export const CREATE_RFP = gql`
  mutation CreateRFP($input: CreateRFPInput!) {
    createRFP(input: $input) {
      id
      title
      description
      jobType
      status
      originalCompany
      emailList
      emailGroupId
      startDate
      bidsDueDate
      User
      createdAt
      updatedAt
    }
  }
`;
