import { gql } from '@apollo/client';

export const GET_JOB_ACTIVITIES = gql`
  query GetJobActivities($rfpId: Int!) {
    jobActivities(rfpId: $rfpId) {
      id
      jobId
      rfpId
      type
      content
      fileName
      fileKey
      author
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_JOB_ACTIVITY = gql`
  mutation CreateJobActivity($input: CreateJobActivityInput!) {
    createJobActivity(input: $input) {
      id
      jobId
      rfpId
      type
      content
      fileName
      fileKey
      author
      createdAt
      updatedAt
    }
  }
`;
