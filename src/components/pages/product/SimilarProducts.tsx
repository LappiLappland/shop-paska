import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { pageURL } from '../../../mocks/browser';
import getSimilarProductsQuery from '../../../queries/GetSimilarProducts';
import ProductSmall from '../../ProductSmall';
import SliderLong from '../../sliderLong/SliderLong';

interface SimilarProductsProps {
  productId: string;
}

export default function SimilarProducts({ productId }: SimilarProductsProps) {
  const { data } = useQuery({
    queryKey: ['slider', 'similar', productId, '12'],
    queryFn: async () =>
      request(pageURL, getSimilarProductsQuery, {
        id: productId,
        amount: 12,
      }),
  });

  const sliderItemsEl = !data
    ? []
    : data.similarProducts.map((e) => {
        return (
          <ProductSmall
            key={e.id}
            images={e.gallery}
            brand={e.brand}
            name={e.name}
            id={e.id}
            tags={e.tags}
            price={e.price}
            discount={e.discount}
            sizes={e.sizes.map((e) => e.value)}
          />
        );
      });

  return (
    <section className="mb-8 px-11">
      <h2 className="mb-4 mt-4 text-center text-display-small font-semibold antialiased">
        Deals On Similar Listings
      </h2>
      <div>
        <SliderLong
          showSlides={{
            lg: 4,
            md: 3,
            sm: 2,
          }}
        >
          {sliderItemsEl}
        </SliderLong>
      </div>
    </section>
  );
}
