import { gql } from '@apollo/client';

export const GET_ACTIVITY_LOGS = gql`
  query GetActivityLogs($limit: Int, $cursor: Int) {
    activityLogs(limit: $limit, cursor: $cursor) {
      id
      action
      entityType
      entityId
      metadata
      createdAt
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
