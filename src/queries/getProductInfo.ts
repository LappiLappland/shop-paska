import { graphql } from "../gql";

const getProductInfoQuery = graphql(`
  query GetProductInfo($id: ID!) {
    productMainInfo(id: $id) {
      id
      name
      brand
      gallery
      price
      discount
      prices {
        colorId
        sizeId
        price
        discount
      }
      category
      sex
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


export default getProductInfoQuery