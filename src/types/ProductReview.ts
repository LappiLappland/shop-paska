import { UserType } from './User';

export interface ProductReviewType {
  id: string;
  user: Pick<UserType, 'id' | 'firstName' | 'avatar'>;
  createdAt: number;
  rating: number;
  text: string;
}
