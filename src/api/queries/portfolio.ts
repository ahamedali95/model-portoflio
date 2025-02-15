import { gql } from '@apollo/client';

export const GET_MODEL_DETAILS = gql`
  query portfolio($id: ID!) {
      portfolio(id: $id) {
        created
        type
        riskLevel
    }
}`;

export const GET_HISTORICAL_PERFORMANCE = gql`
  query historicalPerformance($id: ID!, $timeSpan: String!) {
    historicalPerformance(id: $id, timeSpan: $timeSpan) {
      twr
    }
}`;

export const GET_MARKET_BREAKDOWN = gql`
  query marketBreakdown($id: ID!) {
    marketBreakdown(id: $id) {
    categoryName
    category {
      category
      securities {
        description
        allocation
      }
    }
  
  
    }
}`;