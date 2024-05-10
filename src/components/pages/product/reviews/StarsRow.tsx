import StarIcon from '../../../icons/StarIcon';

interface StarsRowProps {
  filledFor: number;
  className?: string;
}

export default function StarsRow({ filledFor, className = '' }: StarsRowProps) {
  const starsEl = new Array(5).fill(0).map((_, i) => {
    return (
      <StarIcon
        key={i}
        active={(i + 1) * 0.2 <= filledFor}
        className={className}
      />
    );
  });

  return <>{starsEl}</>;
}
