import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import request from 'graphql-request';
import { useContext } from 'react';
import { queryClient } from '..';
import ProductSmall from '../components/ProductSmall';
import { FavouriteContext } from '../components/contexts/FavouriteContext';
import getFavouriteProductsQuery from '../queries/getFavouriteProducts';

export const Route = createFileRoute('/favourite/')({
  component: FavouriteComponent,
  loader: (context) => {
    const favourite = context.context.favourite?.favourite ?? [];
    queryClient.prefetchQuery({  
      queryKey: ['favourite'],
      queryFn: async () =>
        request('http://localhost:8080/', getFavouriteProductsQuery, {
          id: favourite,
        }),
    })
  }
});

function FavouriteComponent() {
  const { favourite } = useContext(FavouriteContext);

  const { data } = useQuery({
    queryKey: ['favourite'],
    queryFn: async () =>
      request('http://localhost:8080/', getFavouriteProductsQuery, {
        id: favourite,
      }),
  });

  const itemsEl = !data
    ? []
    : data.productsFavourite.map((e) => {
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
    <>
      <h1 className="mb-8 mt-4 text-center text-display-small font-bold antialiased">
        Favourite
      </h1>
      {!itemsEl.length ? (
        <span className="mb-6 block text-title-large">
          You have not added anything to favourite yet!
        </span>
      ) : (
        <ul className="mb-3 grid grid-cols-5 gap-4">{itemsEl}</ul>
      )}
    </>
  );
}
