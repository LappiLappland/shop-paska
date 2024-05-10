import { useEffect, useRef, useState } from 'react';
import imageResolve from '../../helpers/imageResolve';
import ArrowIcon from '../icons/ArrowIcon';
import GalleryItem from './GalleryItem';
import GalleryModal from './GalleryModal';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [curImage, setCurImage] = useState(0);
  const [showArrows, setShowArrows] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const listEl = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listEl.current) {
      const scrollHeight = listEl.current.scrollHeight;
      const clientheight = listEl.current.clientHeight;
      if (scrollHeight !== clientheight) {
        updateScroll();
      }
    }
  }, []);

  function updateScroll() {
    if (listEl.current) {
      const scrollTopMax =
        listEl.current.scrollHeight - listEl.current.clientHeight;
      const scrollTop = listEl.current.scrollTop;
      if (scrollTop === scrollTopMax) {
        setShowArrows(1);
      } else if (scrollTop === 0) {
        setShowArrows(2);
      } else {
        setShowArrows(3);
      }
    }
  }

  const imagesEl = images.map((e, i) => {
    return (
      <GalleryItem
        key={i}
        src={e}
        selected={i === curImage}
        onClick={() => setCurImage(i)}
      />
    );
  });

  return (
    <div className="flex h-full w-full md:flex-row flex-col-reverse">
      <div className="relative mr-4">
        {showArrows !== 1 && showArrows !== 3 ? (
          ''
        ) : (
          <span className="hidden md:flex absolute top-0 w-full justify-center bg-surface-container fill-on-surface-variant">
            <ArrowIcon direction="up" />
          </span>
        )}
        <ul
          className="scrollbar-hide w-15 flex h-full flex-row md:flex-col gap-3 overflow-y-auto px-1 py-2"
          ref={listEl}
          onScroll={() => updateScroll()}
        >
          {imagesEl}
        </ul>
        {showArrows !== 2 && showArrows !== 3 ? (
          ''
        ) : (
          <span className="hidden md:flex absolute bottom-0 w-full justify-center bg-surface-container fill-on-surface-variant">
            <ArrowIcon direction="down" />
          </span>
        )}
      </div>
      <picture
        className="flex h-0 md:h-full grow cursor-pointer items-center justify-center bg-surface-container"
        onClick={() => setShowModal(true)}
      >
        <source srcSet={imageResolve(images[curImage], 'webp')} type="image/webp" />
        <img
          className="h-full object-scale-down"
          src={imageResolve(images[curImage])}
          alt=""
        />
      </picture>
      <GalleryModal
        images={images}
        curImage={curImage}
        setCurImage={setCurImage}
        setShowModal={setShowModal}
        isOpened={showModal}
      />
    </div>
  );
}
