import { graphql } from "../gql";

const putProfileMainMutation = graphql(`
  mutation ProfileMainMutation($firstName: String, $lastName: String, $birth: Date, $sex: Sex) {
    profileMain(firstName: $firstName, lastName: $lastName, birth: $birth, sex: $sex) {
      firstName
      lastName
      birth
      sex
    }
  }
`)

export default putProfileMainMutation;