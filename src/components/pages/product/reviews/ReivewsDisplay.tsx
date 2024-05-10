import { ProductReviewType } from '../../../../types/ProductReview';
import Review from './Review';

interface ReviewsDisplayProps {
  reviews: ProductReviewType[];
}

export default function ReviewsDisplay({ reviews }: ReviewsDisplayProps) {
  const itemsEl = reviews.map((e, i) => {
    return (
      <li
        className="mb-3 border-b-2 border-outline-variant pb-3 last:mb-0"
        key={i}
      >
        <Review
          nickname={e.user.firstName}
          date={new Date(e.createdAt)}
          stars={e.rating}
          text={e.text}
          avatar={e.user.avatar}
        />
      </li>
    );
  });

  return <ul className="border-t-2 border-outline-variant pt-3">{itemsEl}</ul>;
}
