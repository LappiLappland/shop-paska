import { graphql } from "../gql";

const getCategoryFiltersQuery = graphql(`
  query GetCategoryFilters($category: String!, $sex: Sex!) {
    categoryFilters(category: $category, sex: $sex) {
      id
      name
      options {
        name
        value
      }
    }
  }
`)


export default getCategoryFiltersQuery