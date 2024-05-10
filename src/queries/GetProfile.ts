import { graphql } from "../gql";

const getProfileQuery = graphql(`
  query GetProfile {
    profile {
      id
      firstName
      lastName
      email
      avatar
      phone
      sex
      birth
    }
  }
`)


export default getProfileQuery