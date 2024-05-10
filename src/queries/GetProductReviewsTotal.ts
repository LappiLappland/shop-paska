import { graphql } from "../gql";

const getProductReviewsTotalQuery = graphql(`
  query GetProductReviewsTotal($id: ID!) {
    productReviews(id: $id, first: 0, after: 0) {
      totalCount
      totalStars {
        s1
        s2
        s3
        s4
        s5
      }
    }
  }
`)

export default getProductReviewsTotalQuery;