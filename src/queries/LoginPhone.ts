import { graphql } from "../gql";

const loginPhoneMutation = graphql(`
  mutation LoginPhone($phone: String!) {
    loginPhone(phone: $phone) {
      phone
    }
  }
`)

export default loginPhoneMutation