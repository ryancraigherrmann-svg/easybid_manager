import { gql } from '@apollo/client';

export const GET_JOB_TYPES = gql`
  query GetJobTypes {
    jobTypes {
      id
      name
    }
  }
`;

export const CREATE_JOB_TYPE = gql`
  mutation CreateJobType($name: String!) {
    createJobType(name: $name) {
      id
      name
    }
  }
`;
