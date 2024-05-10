import { useCallback, useEffect, useRef, useState } from 'react';
import imageResolve from '../../helpers/imageResolve';
import CloseControl from '../CloseControl';
import ModalWindow from '../ModalWindow';
import ScrollControl from '../ScrollControl';
import GalleryItem from './GalleryItem';

interface GalleryModal {
  images: string[];
  curImage: number;
  setCurImage: (id: number) => void;
  setShowModal: (show: boolean) => void;
  isOpened: boolean;
}

export default function GalleryModal({
  images,
  curImage,
  setCurImage,
  setShowModal,
  isOpened,
}: GalleryModal) {
  const [zoomed, setZoomed] = useState(false);
  const [wantZoom, setWantZoom] = useState(false);


  const containerEl = useRef<HTMLDivElement>();
  const imgEl = useRef<HTMLImageElement>();
  const containerElCallback = useCallback((node: HTMLDivElement) => {
    containerEl.current = node;
    resizeContainer();
  }, [])
  const imgElCallback = useCallback((node: HTMLImageElement) => {
    imgEl.current = node;
    resizeContainer();
  }, [])
  
  useEffect(() => {
    setWantZoom(false);
    resizeContainer();
  }, [curImage]);

  useEffect(() => {
    if (!zoomed && imgEl.current) {
      imgEl.current.style.transform = '';
    }
  }, [zoomed]);

  function resizeContainer() {
    if (imgEl.current && containerEl.current) {
      const rect = imgEl.current.getBoundingClientRect();
      containerEl.current.style.width = rect.width + 'px';
      containerEl.current.style.height = rect.height + 'px';
    }
  }

  function clickHandler(id: number) {
    if (id < 0) {
      id = images.length - 1;
    } else if (id >= images.length) {
      id = 0;
    }
    setCurImage(id);
  }

  function clickZoomHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!wantZoom) {
      setWantZoom(true);
      setZoomed(true);
      mouseMoveHandler(e);
    } else {
      setWantZoom(false);
      setZoomed(false);
    }
  }

  function mouseMoveHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const rect = containerEl.current!.getBoundingClientRect();

    const scale = 5;
    const posX = ((e.clientX - rect.left) / rect.width) * 100;
    const posY = ((e.clientY - rect.top) / rect.height) * 100;

    imgEl.current!.style.transform = `scale(${scale}) translate(-${posX}%, -${posY}%)`;
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
    <ModalWindow
      id="gallery"
      bgClassName="flex"
      windowClassName={`
      duration-300 opacity-0
      w-full h-full
      flex flex-col lg:flex-row-reverse relative
      rounded
      `}
      addButton
      isOpened={isOpened}
      onClosedWindow={() => setShowModal(false)}
      onBeginClosing={(node, setStyle) => {
        setStyle({
          opacity: '0',
        });
      }}
      onBeginOpening={(node, setStyle) => {
        setStyle({
          opacity: '1',
        });
      }}
    >
      <picture className="relative flex h-full grow items-center justify-center bg-surface-container">

        <source srcSet={imageResolve(images[curImage], 'webp')} type="image/webp" />
        <img
          className="max-h-full origin-top-left object-scale-down will-change-transform"
          ref={imgElCallback}
          src={imageResolve(images[curImage])}
          alt=""
        />

        <div
          className={`absolute ${wantZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          ref={containerElCallback}
          onClick={(e) => clickZoomHandler(e)}
          onMouseMove={(e) => {
            if (zoomed && wantZoom) mouseMoveHandler(e);
          }}
          onMouseEnter={() => {
            if (wantZoom) setZoomed(true);
          }}
          onMouseLeave={() => {
            if (wantZoom) setZoomed(false);
          }}
        />

        <ScrollControl
          className="left-3.5 z-20 p-2"
          position="absolute"
          onClick={() => clickHandler(curImage - 1)}
          direction="left"
        />
        <ScrollControl
          className="right-3.5 z-20 p-2"
          position="absolute"
          onClick={() => clickHandler(curImage + 1)}
          direction="right"
        />
        <CloseControl
          className="absolute right-2 top-2 z-20 h-8 w-8 p-2"
          onClick={() => setShowModal(false)}
        />
      </picture>
      <div className="shrink-0 z-10 overflow-auto bg-surface-container-high p-5">
        <ul className="flex flex-row gap-3 px-2 lg:flex-col">{imagesEl}</ul>
      </div>
    </ModalWindow>
  );
}
