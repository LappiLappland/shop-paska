import { ProductSizeType } from '../../../types/ProductSize';
import ButtonToggle from '../../ButtonToggle';

interface SizeSelectProps {
  sizes: ProductSizeType[];
  curSize: string;
  setCurSize: (size: string) => void;
}

export default function SizeSelect({
  sizes,
  curSize,
  setCurSize,
}: SizeSelectProps) {
  const sizesEl = sizes.map((e) => {
    const isActive = curSize === e.id;
    return (
      <ButtonToggle
        className={`flex h-12 w-14
        items-center  justify-center
        rounded
        text-center
        ${isActive ? 'border-2' : ''}
        `}
        key={e.id}
        onClick={() => setCurSize(e.id)}
        active={isActive}
        dataTestid="size-select"
      >
        {e.value}
      </ButtonToggle>
    );
  });

  return <ul className="flex gap-1">{sizesEl}</ul>;
}
