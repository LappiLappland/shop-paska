import { graphql } from "../gql";

const getProductsCartQuery = graphql(`
  query GetProductsCart($products: [ProductCartParams!]!) {
    productsCart(products: $products) {
      product {
        id
        name
        brand
        gallery
        price
        discount
        tags
        prices {
          sizeId
          colorId
          price
          discount
        }
      }
      selectedSize {
        id
        value
      }
      selectedColor {
        id
        hex
      }
    }
  }
`)


export default getProductsCartQuery