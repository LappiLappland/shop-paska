import { graphql } from "../gql";

const getAllCategoriesQuery = graphql(`
  query GetAllCategories {
    allCategories {
      female {
        title
        items
      }
      male {
        title
        items
      }
    }
  }
`)


export default getAllCategoriesQuery