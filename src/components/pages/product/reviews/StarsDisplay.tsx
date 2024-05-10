import roundNumber from '../../../../helpers/roundNumber';
import StarLine from './StarLine';
import StarsRow from './StarsRow';

interface StarsDisplayProps {
  totalReviews?: number;
  starsInfo?: {
    s1: number;
    s2: number;
    s3: number;
    s4: number;
    s5: number;
  };
}

export default function StarsDisplay({
  totalReviews = 0,
  starsInfo = { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
}: StarsDisplayProps) {
  const totalRating = Object.values(starsInfo).reduce(
    (prev, curr, i) => prev + curr * (i + 1),
    0,
  );

  const avg = roundNumber(totalRating / totalReviews, 2);

  return (
    <div className="ml-5 h-fit w-full max-w-96 rounded-lg bg-surface-container p-3 shadow-level-1">
      <span className="mb-2 flex w-full justify-between">
        <span className="flex flex-row">
          <StarsRow filledFor={avg / 5} />
        </span>
        <span className="text-headline-small font-bold text-on-surface">
          {avg + ' / 5'}
        </span>
      </span>
      <hr className="mb-6 h-1 rounded-full bg-outline-variant" />
      <ol className="flex flex-col gap-2">
        <li>
          <StarLine text="5" limit={totalReviews} value={starsInfo.s5} />
        </li>
        <li>
          <StarLine text="4" limit={totalReviews} value={starsInfo.s4} />
        </li>
        <li>
          <StarLine text="3" limit={totalReviews} value={starsInfo.s3} />
        </li>
        <li>
          <StarLine text="2" limit={totalReviews} value={starsInfo.s2} />
        </li>
        <li>
          <StarLine text="1" limit={totalReviews} value={starsInfo.s1} />
        </li>
      </ol>
    </div>
  );
}
