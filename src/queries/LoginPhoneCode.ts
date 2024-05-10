import { graphql } from "../gql";

const loginPhoneCodeMutation = graphql(`
  mutation LoginPhoneCode($phone: String!, $code: String!) {
    loginPhoneCode(phone: $phone, code: $code) {
      token
      user {
        id
      }
    }
  }
`)

export default loginPhoneCodeMutation