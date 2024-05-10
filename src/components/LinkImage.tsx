import { Link } from '@tanstack/react-router';
import imageResolve from '../helpers/imageResolve';

interface LinkImageProps {
  text?: string;
  img: string;
  sex: 'menswear' | 'womenswear';
}

export default function LinkImage({ text = '', img, sex }: LinkImageProps) {
  return (
    <div className="link-image h-1/2 w-full grow border border-outline-variant">
      <Link
        className="relative flex h-full justify-center overflow-hidden bg-surface-container-high"
        to="/catalog"
        search={{ sex }}
      >
        <picture className="flex h-full w-full items-center justify-center">
          <source srcSet={imageResolve(img, 'webp')} type="image/webp" />
          <img
            className="object-scale-down w-full transition-transform brightness-90"
            src={imageResolve(img)}
            alt={sex}
          />
        </picture>
        <span className="absolute bottom-2 text-lg">
          <div className="px-4 py-2 font-bold uppercase tracking-tight text-surface">
            {text}
          </div>
        </span>
      </Link>
    </div>
  );
}
