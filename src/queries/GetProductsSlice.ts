import { graphql } from "../gql";

const getProductsSliceQuery = graphql(`
  query GetProductsSlice($first: Int!, $after: Int!, $sex: Sex!, $category: String!, $sort: SortOptions, $filters: [FilterOptions!]) {
    slicedProducts(first: $first, after: $after, sex: $sex, category: $category, sort: $sort, filters: $filters) {
      totalCount
      products {
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
  }
`)

export default getProductsSliceQuery;