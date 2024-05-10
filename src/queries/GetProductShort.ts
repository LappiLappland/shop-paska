import { graphql } from "../gql";

const getProductInfoShortQuery = graphql(`
  query GetProductInfoShort($id: ID!) {
    productMainInfo(id: $id) {
      id
      name
      brand
      gallery
      price
      discount
      tags
      sizes {
        id
        value
      }
    }
  }
`)


export default getProductInfoShortQuery