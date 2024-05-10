import { graphql } from "../gql";

const getSliderProductsQuery = graphql(`
  query GetSliderProducts($type: String!, $sex: String!, $amount: Int!) {
    sliderProducts(type: $type, sex: $sex, amount: $amount) {
      id
      name
      brand
      gallery
      price
      discount
      tags
      sizes {
        value
      }
    }
  }
`)

export default getSliderProductsQuery