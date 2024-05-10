import { selectRandomItem, shuffleArray } from '../helpers/random';
import { ProductReviewType } from '../types/ProductReview';
import randomSetences from './data/randomSentences.json';

export default function generateRandomReviews(from: number, to: number) {
  const reviews: ProductReviewType[] = [];
  const howMany = from + Math.floor((to - from) * Math.random());
  for (let i = 0; i < howMany; i++) {
    reviews[i] = createReview(i + '');
  }
  return reviews;
}

const firstNameArr = 'LappiLappland'.split('');

function createReview(id: string) {
  const review: ProductReviewType = {
    id: id,
    user: {
      id: '12',
      firstName: shuffleArray([...firstNameArr])
        .join('')
        .toLowerCase(),
      avatar:
        'img/' +
        selectRandomItem(['placeholder', 'placeholder2', 'placeholder3']),
    },
    createdAt: Date.now() - 100_000_000_000 * Math.random(),
    rating: selectRandomItem([1, 2, 3, 4, 5]),
    text: selectRandomItem(randomSetences),
  };

  return review;
}
