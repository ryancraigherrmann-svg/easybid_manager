import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type RFP {
    id: Int!
    currentBids: Int
    title: String
    description: String
    jobType: String
    images: String
    attributes: String
    originalCompany: String
    status: Int
    startDate: String
    bidsDueDate: String
    emailList: [String!]
    emailGroupId: Int
    emailGroup: EmailGroup
    User: String
    createdAt: String!
    updatedAt: String!
  }

  type EmailGroup {
    id: Int!
    name: String!
    company: String
    emails: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type BidPosting {
    id: Int!
    bidId: Int!
    description: String
    type: String
    images: String
    attributes: String
    selectedOffer: Int
    company: String
    createdAt: String!
    updatedAt: String!
  }

  type Bid {
    id: Int!
    title: String!
    amount: Float!
    status: String!
    rfpId: Int
    user: String
    company: String
    info: String
    expectedDate: String
    approved: Boolean!
    createdAt: String!
    updatedAt: String!
    postings: [BidPosting!]!
    lineItems: [BidLineItem!]!
  }

  type BidLineItem {
    id: Int!
    bidId: Int!
    description: String
    amount: Float
    createdAt: String!
    updatedAt: String!
  }

  type Job {
    id: Int!
    title: String!
    description: String
    rfpId: Int
    jobType: String
    startDate: String
    daysExpected: Int
    company: String
    createdAt: String!
    updatedAt: String!
  }

  type WeekBucket {
    weekStart: String!
    weekLabel: String!
    count: Int!
    totalAmount: Float!
  }

  type AwardeeSlice {
    company: String!
    count: Int!
  }

  type RFPStatusSlice {
    status: Int!
    statusLabel: String!
    count: Int!
  }

  type AnalyticsData {
    rfps: [WeekBucket!]!
    bids: [WeekBucket!]!
    jobs: [WeekBucket!]!
    awardees: [AwardeeSlice!]!
    rfpsByStatus: [RFPStatusSlice!]!
    summary: AnalyticsSummary!
  }

  type AnalyticsSummary {
    totalRFPs: Int!
    totalBids: Int!
    totalJobs: Int!
    totalBidAmount: Float!
    totalJobValue: Float!
    pendingBidAmount: Float!
  }

  type Query {
    bids(limit: Int, page: Int): [Bid!]!
    bid(id: Int!): Bid
    bidPostings(bidId: Int, limit: Int, page: Int): [BidPosting!]!
    bidPosting(id: Int!): BidPosting
    rfps: [RFP!]!
    emailGroups(company: String): [EmailGroup!]!
    jobs: [Job!]!
    bidsForRFP(rfpId: Int!): [Bid!]!
    analytics(startDate: String, endDate: String): AnalyticsData!
  }


  input CreateRFPInput {
    currentBids: Int
    title: String
    description: String
    jobType: String
    images: String
    attributes: String
    originalCompany: String
    status: Int
    startDate: String
    bidsDueDate: String
    emailList: [String!]
    emailGroupId: Int
    User: String
  }

  input UpdateRFPInput {
    currentBids: Int
    title: String
    description: String
    jobType: String
    images: String
    attributes: String
    originalCompany: String
    status: Int
    startDate: String
    bidsDueDate: String
    emailList: [String!]
    emailGroupId: Int
    User: String
  }


  input CreateBidInput {
    title: String
    amount: Float!
    status: String
    rfpId: Int
    user: String
    company: String
    info: String
    expectedDate: String
    lineItems: [LineItemInput!]
  }
  input LineItemInput {
    description: String
    amount: Float
  }
  input UpdateBidInput {
    title: String
    amount: Float
    status: String
    approved: Boolean
  }

  input CreateJobInput {
    title: String!
    description: String
    rfpId: Int
    jobType: String
    startDate: String
    daysExpected: Int
    company: String
  }

  input CreateEmailGroupInput {
    name: String!
    company: String
    emails: [String!]
  }

  input UpdateEmailGroupInput {
    name: String
    company: String
    emails: [String!]
  }

  type Mutation {
    createBid(input: CreateBidInput!): Bid!
    updateBid(id: Int!, input: UpdateBidInput!): Bid!
    deleteBid(id: Int!): Bid!
    createRFP(input: CreateRFPInput!): RFP!
    updateRFPStatus(id: Int!, status: Int!): RFP!
    updateRFP(id: Int!, input: UpdateRFPInput!): RFP!
    createEmailGroup(input: CreateEmailGroupInput!): EmailGroup!
    updateEmailGroup(id: Int!, input: UpdateEmailGroupInput!): EmailGroup!
    deleteEmailGroup(id: Int!): Boolean!
    createJob(input: CreateJobInput!): Job!
  }
`;
