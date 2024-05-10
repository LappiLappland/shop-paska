import imageResolve from '../../helpers/imageResolve';

interface GalleryItemProps {
  src: string;
  selected: boolean;
  onClick: () => void;
}

export default function GalleryItem({
  src,
  selected,
  onClick,
}: GalleryItemProps) {
  const selectedClass = selected ? 'ring-2' : 'ring-1';

  return (
    <li
      className={`select-none h-16 w-14 shrink-0 cursor-pointer p-1 ${selectedClass} bg-surface-container ring-outline`}
      onClick={() => onClick()}
    >
      <picture
        className="h-full flex justify-center"
      >
        <source srcSet={imageResolve(src, 'webp')} type="image/webp" />
        <img className="h-full" src={imageResolve(src)} alt="" />
      </picture>
    </li>
  );
}
