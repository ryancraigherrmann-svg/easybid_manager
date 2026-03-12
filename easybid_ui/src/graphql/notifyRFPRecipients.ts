import { gql } from '@apollo/client';

export const NOTIFY_RFP_RECIPIENTS = gql`
  mutation NotifyRFPRecipients($rfpId: Int!, $emails: [String!]!) {
    notifyRFPRecipients(rfpId: $rfpId, emails: $emails)
  }
`;
