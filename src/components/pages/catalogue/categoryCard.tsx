import { Link } from '@tanstack/react-router';
import imageResolve from '../../../helpers/imageResolve';

const placeholder = 'img/placeholder-tall';
const placeholder2 = 'img/placeholder';

interface CategoryCardProps {
  className?: string;
  direction?: 'column' | 'row';
  text: string;
  link: string;
}

export default function CategoryCard({
  className,
  direction = 'column',
  text,
  link,
}: CategoryCardProps) {
  return (
    <article className={className}>
      <Link
        className={`flex h-full w-full cursor-pointer rounded-lg border bg-surface-container-highest text-on-surface antialiased transition-shadow hover:bg-surface-container-highest/hovered hover:shadow-level-1
        ${direction === 'row' ? 'h-[280px] flex-row' : 'min-h-[430px] flex-col'}`}
        to={link}
        preload="intent"
      >
        <picture className="flex shrink grow justify-center bg-transparent">
          <source srcSet={imageResolve(direction === 'column' ? placeholder : placeholder2, 'webp')} type="image/webp" />
          <img
            className="object-scale-down"
            src={imageResolve(direction === 'column' ? placeholder : placeholder2)}
            alt=""
          />
        </picture>
        <p
          className={`flex shrink-0 grow-0 items-center justify-center p-6 text-2xl ${direction === 'row' ? 'w-1/2' : 'basis-[130px]'}`}
        >
          {text}
        </p>
      </Link>
    </article>
  );
}
