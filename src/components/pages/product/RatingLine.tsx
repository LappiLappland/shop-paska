import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import request from 'graphql-request';
import roundNumber from '../../../helpers/roundNumber';
import getProductReviewsTotalQuery from '../../../queries/GetProductReviewsTotal';
import StarIcon from '../../icons/StarIcon';

interface RatingLineProps {
  productId: string;
}

export default function RatingLine({ productId }: RatingLineProps) {
  const { data } = useQuery({
    queryKey: ['product', 'reviews', 'total', productId],
    queryFn: async () =>
      request('http://localhost:8080/', getProductReviewsTotalQuery, {
        id: productId,
        first: 0,
        after: 0,
      }),
  });

  const totalRating = data?.productReviews ? Object.values(data.productReviews.totalStars).reduce(
    (prev: number, curr, i) => {
      if (curr === 'StarsCounter' || curr === undefined) return prev;
      return (prev as number) + curr * (i + 1);
    },
    0,
  ) : null;

  const avg = totalRating ? roundNumber(totalRating / data!.productReviews!.totalCount, 2) : '0.0';

  return (
    <Link
      className="hidden w-max border-b border-b-transparent text-label-medium text-on-surface-variant hover:border-on-surface-variant lg:flex"
      hash="reviews"
    >
      <span className='flex items-center after:mx-1.5 after:content-["•"]'>
        <StarIcon className="mb-0.5 mr-1 h-3 w-3" active />
        {avg}
      </span>
      <span>{(data?.productReviews?.totalCount || '0') + ' reviews'}</span>
    </Link>
  );
}
