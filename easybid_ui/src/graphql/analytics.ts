import { gql } from '@apollo/client';

export const GET_ANALYTICS = gql`
  query GetAnalytics($startDate: String, $endDate: String) {
    analytics(startDate: $startDate, endDate: $endDate) {
      rfps {
        weekStart
        weekLabel
        count
        totalAmount
      }
      bids {
        weekStart
        weekLabel
        count
        totalAmount
      }
      jobs {
        weekStart
        weekLabel
        count
        totalAmount
      }
      awardees {
        company
        count
      }
      rfpsByStatus {
        status
        statusLabel
        count
      }
      summary {
        totalRFPs
        totalBids
        totalJobs
        totalBidAmount
        totalJobValue
        pendingBidAmount
      }
    }
  }
`;
