import { graphql } from "../gql";

const getProductReviewsQuery = graphql(`
  query GetProductReviews($id: ID!, $first: Int!, $after: Int!) {
    productReviews(id: $id, first: $first, after: $after) {
      totalCount
      totalStars {
        s1
        s2
        s3
        s4
        s5
      }
      reviews {
        id
        createdAt
        rating
        text
        user {
          id
          firstName
          avatar
        }
      }
    }
  }
`)

export default getProductReviewsQuery;