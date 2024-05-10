import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import request from 'graphql-request';
import { useRef, useState } from 'react';
import { GetProductInfoShortQuery, Tag } from '../gql/graphql';
import formatNumber from '../helpers/formatNumber';
import { getDiscounted } from '../helpers/getDiscounted';
import imageResolve from '../helpers/imageResolve';
import resetScroll from '../helpers/resetScroll';
import { pageURL } from '../mocks/browser';
import getProductInfoQuery from '../queries/getProductInfo';
import ProductTag from './ProductTag';

//These can be moved inside props
const minPrefetchDelay = 1000;
const minDelay = 150;

const limitImages = 6;
const limitSizes = 6;

interface ProductSmall {
  images: string[];
  brand: string;
  name: string;
  id: string;
  price: number;
  discount: number;
  sizes: string[];
  tags: Tag[];
}

export default function ProductSmall({
  images,
  brand,
  name,
  id,
  price,
  discount,
  sizes,
  tags = [],
}: ProductSmall) {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const firstPress = useRef(0);

  const didPrefetch = useRef(false);
  const prefetchTimer = useRef<undefined | NodeJS.Timeout>();

  const queryClient = useQueryClient();

  const imageSelectorsEl = images.slice(0, limitImages).map((e, i) => {
    return (
      <div
        className="h-full grow"
        key={i}
        onMouseEnter={() => setCurrentImage(i)}
      />
    );
  });

  const sizesEl = sizes.slice(0, limitSizes).map((e, i) => {
    return (
      <li className="text-label-small" key={i}>
        {e}
      </li>
    );
  });

  const tagsEl = tags.map((e) => {
    return (
      <li key={e}>
        <ProductTag type={e} />
      </li>
    );
  });

  function mouseDownHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    firstPress.current = e.timeStamp;
  }

  function mouseClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (e.timeStamp - firstPress.current > minDelay) {
      return;
    }

    const info: GetProductInfoShortQuery = {
      productMainInfo: {
        __typename: 'Product',
        id: id,
        name: name,
        brand: brand,
        gallery: images,
        price: price,
        discount: discount,
        tags: tags,
        sizes: sizes.map((e, i) => {return {id: '-'+i, value: e}}),
      }
    }
    queryClient.setQueryData(['product', 'short', id], info)

    navigate({ to: '/product/' + id });
    resetScroll();
  }

  function mouseEnterHandler() {
    if (!didPrefetch.current) {
      prefetchTimer.current = setTimeout(() => {
        queryClient.prefetchQuery({
          queryKey: ['product', 'main', id],
          queryFn: async () =>
            request(pageURL, getProductInfoQuery, { id: id }),
          staleTime: 60000,  
        })
        didPrefetch.current = true;
      }, minPrefetchDelay);
    }
  }

  function mouseLeaveHandler() {
    clearTimeout(prefetchTimer.current);
  }

  function generateDotsElements() {
    const dotsListEl = [];
    for (let i = 0; i < imageSelectorsEl.length; i++) {
      dotsListEl.push(
        <li
          className={`mr-1 flex h-2 w-2 items-center rounded-full border border-on-surface-variant ${i === currentImage ? 'bg-on-surface-variant' : ''}`}
          key={i}
        />,
      );
    }
    return dotsListEl;
  }

  return (
    <article
      className="product-small relative flex h-full w-full cursor-pointer flex-col rounded-xl bg-surface p-2 ring-outline-variant hover:z-10 hover:bg-surface-container-low/hovered hover:shadow-level-2 hover:ring-2"
      onClick={mouseClickHandler}
      onMouseDown={mouseDownHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      data-testid="product-card"
    >
      <div className="relative flex justify-center">
        <div
          className="absolute flex h-full w-full"
          onMouseLeave={() => setCurrentImage(0)}
        >
          {imageSelectorsEl}
        </div>
        <picture>
          <source srcSet={imageResolve(images[currentImage], 'webp')} type="image/webp" />
          <img
            className="object-scale-down"
            src={imageResolve(images[currentImage])}
            draggable={false}
            alt=""
          />
        </picture>
      </div>
      <ul className="absolute left-2 top-2 mt-1 ml-1 flex flex-col gap-0.5">{tagsEl}</ul>
      <ul className="invisible bottom-0 py-0.5 flex justify-center">
        {generateDotsElements()}
      </ul>
      <div className="flex grow flex-col">
        <p className="text-title-medium font-bold text-on-surface">{brand}</p>
        <p className="h-10 pr-2 text-title-small text-on-surface-variant">
          {name}
        </p>
        {!discount ? (
          <p className="text-title-medium text-on-surface">{price + ' P'}</p>
        ) : (
          <div className="flex flex-col">
            <ins className="mr-2 text-title-medium text-on-surface no-underline">
              {formatNumber(getDiscounted(price, discount)) + ' P'}
            </ins>
            <div>
              <del className="mr-2 text-on-surface-variant">
                {formatNumber(price) + ' P'}
              </del>
              <span className="mt-1.5 h-min rounded bg-tertiary px-1 py-0.5 text-label-large text-on-tertiary">
                {'-' + discount * 100 + '%'}
              </span>
            </div>
          </div>
        )}

        <ul className="invisible mt-auto flex gap-1 text-label-medium text-on-surface-variant">
          {sizesEl}
        </ul>
      </div>
    </article>
  );
}
