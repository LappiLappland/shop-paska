import { useInfiniteQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { pageURL } from '../../../../mocks/browser';
import getProductReviewsQuery from '../../../../queries/GetProductReviews';
import ButtonText from '../../../ButtonText';
import ReviewsDisplay from './ReivewsDisplay';
import StarsDisplay from './StarsDisplay';

const showMore = 3;

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['reviews', productId],
    queryFn: async ({ pageParam = 0 }) =>
      request(pageURL, getProductReviewsQuery, {
        id: productId,
        first: showMore,
        after: pageParam,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (
        pages.length * showMore >=
        (lastPage.productReviews?.totalCount || 0)
      ) {
        return;
      }
      return pages.length * showMore;
    },
    initialPageParam: 0,
  });

  const reviews = !data
    ? []
    : data.pages.map((page) => page.productReviews!.reviews).flat();

  const totalReviews = data?.pages[0].productReviews?.totalCount;
  const totalStars = data?.pages[0].productReviews?.totalStars;

  if (reviews.length === 0) {
    return (
      <section className="p-5" id="reviews">
        <div className="mb-3 flex">
          <h1 className="text-display-small">Reviews</h1>
          {!totalReviews ? (
            ''
          ) : (
            <span className="ml-1 text-label-large">{totalReviews}</span>
          )}
        </div>
        <div>
          <span className="text-headline-small">No reviews</span>
        </div>
      </section>
    );
  }

  return (
    <section className="p-5" id="reviews">
      <div className="mb-3 flex">
        <h1 className="text-display-small">Reviews</h1>
        {!totalReviews ? (
          ''
        ) : (
          <span className="ml-1 text-label-large">{totalReviews}</span>
        )}
      </div>
      <div className="flex flex-col-reverse justify-between lg:flex-row">
        <div className="flex w-full flex-col justify-center pt-6 lg:w-3/5">
          <ReviewsDisplay reviews={reviews} />
          {!hasNextPage ? (
            ''
          ) : (
            <ButtonText
              className="text-label-large"
              onClick={() => {
                if (!isFetching) {
                  fetchNextPage();
                }
              }}
            >
              Load more...
            </ButtonText>
          )}
        </div>
        <div className="flex w-full justify-center lg:w-2/5">
          <StarsDisplay totalReviews={totalReviews} starsInfo={totalStars} />
        </div>
      </div>
    </section>
  );
}
