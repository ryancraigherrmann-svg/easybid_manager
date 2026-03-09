import { gql } from '@apollo/client';

export const CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      id
      title
      description
      rfpId
      jobType
      startDate
      daysExpected
      company
    }
  }
`;
