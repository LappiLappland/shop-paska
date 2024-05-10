import { graphql } from "../gql";

const loginEmailMutation = graphql(`
  mutation LoginEmail($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`)

export default loginEmailMutation