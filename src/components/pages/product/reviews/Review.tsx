import imageResolve from '../../../../helpers/imageResolve';
import StarsRow from './StarsRow';

interface ReviewProps {
  nickname: string;
  date: Date;
  stars: number;
  text: string;
  avatar: string;
}

export default function Review({
  nickname,
  date,
  stars,
  text,
  avatar,
}: ReviewProps) {
  return (
    <blockquote className="flex w-full flex-row">
      <div className="mr-5 w-16 flex-shrink-0 rounded-full">
        <picture>
          <source srcSet={imageResolve(avatar, 'webp')} type="image/webp" />
          <img src={imageResolve(avatar)} alt="avatar" />
        </picture>
      </div>
      <div className="grow">
        <div className="mb-3 flex flex-row justify-between">
          <div>
            <h2 className="mb-2 text-title-medium font-semibold">{nickname}</h2>
            <time
              className="text-title-small text-on-surface-variant"
              dateTime={date.toLocaleDateString()}
            >
              {date.toLocaleString()}
            </time>
          </div>
          <div className="">
            <span className="flex flex-row">
              <StarsRow
                filledFor={stars / 5}
                className="h-4 w-4 md:h-8 md:w-8"
              />
            </span>
          </div>
        </div>
        <p className="font-serif text-body-large">{text}</p>
      </div>
    </blockquote>
  );
}
