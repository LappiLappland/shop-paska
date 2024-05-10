import { graphql } from "../gql";

const getFavouriteProductsQuery = graphql(`
  query GetFavouriteProducts($id: [ID!]!) {
    productsFavourite(id: $id) {
      id
      name
      brand
      gallery
      price
      discount
      sizes {
        id
        type
        value
        available
      }
      tags
      colors {
        id
        name
        hex
      }
      description
      properties {
        name
        value
      }
    }
  }
`)


export default getFavouriteProductsQuery