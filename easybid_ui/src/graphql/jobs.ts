import { gql } from '@apollo/client';

export const GET_JOBS = gql`
  query GetJobs {
    jobs {
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
