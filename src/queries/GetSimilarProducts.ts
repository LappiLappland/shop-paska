import { graphql } from "../gql";

const getSimilarProductsQuery = graphql(`
  query GetSimilarProducts($id: ID!, $amount: Int!) {
    similarProducts(id: $id, amount: $amount) {
      id
      name
      brand
      gallery
      price
      tags
      discount
      sizes {
        value
      }
    }
  }
`)

export default getSimilarProductsQuery