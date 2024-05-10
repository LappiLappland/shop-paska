import { Sex } from '../gql/graphql';

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  birth: number | null;
  sex: Sex;
}

export type UserTypeShort = Pick<
  UserType,
  'id' | 'firstName' | 'lastName' | 'avatar'
>;
