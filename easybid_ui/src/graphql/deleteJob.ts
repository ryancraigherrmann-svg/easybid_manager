import { gql } from '@apollo/client';

export const DELETE_JOB = gql`
  mutation DeleteJob($id: Int!) {
    deleteJob(id: $id) {
      id
    }
  }
`;
