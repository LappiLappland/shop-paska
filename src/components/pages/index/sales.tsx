import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import getSliderProductsQuery from '../../../queries/GetSliderProducts';
import ProductSmall from '../../ProductSmall';
import SliderLong from '../../sliderLong/SliderLong';

export default function MeetSales() {
  const { data } = useQuery({
    queryKey: ['slider', 'sales', 'any', '10'],
    queryFn: async () =>
      request('http://localhost:8080/', getSliderProductsQuery, {
        type: 'sales',
        sex: 'any',
        amount: 12,
      }),
  });

  const sliderItemsEl = !data
    ? []
    : data.sliderProducts.map((e) => {
        return (
          <ProductSmall
            key={e.id}
            images={e.gallery}
            brand={e.brand}
            name={e.name}
            id={e.id}
            price={e.price}
            discount={e.discount}
            sizes={e.sizes.map((e) => e.value)}
            tags={e.tags}
          />
        );
      });

  return (
    <section className="mb-8">
      <h2 className="mb-4 mt-4 text-center text-display-small font-semibold antialiased">
        Sales
      </h2>
      <div>
        <SliderLong
          showSlides={{
            lg: 6,
            md: 4,
            sm: 2,
          }}
        >
          {sliderItemsEl}
        </SliderLong>
      </div>
    </section>
  );
}
