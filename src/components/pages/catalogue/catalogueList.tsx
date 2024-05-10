import { GetProductInfoShortQuery } from '../../../gql/graphql';
import ProductSmall from '../../ProductSmall';

interface CatalogueListProps {
  products: GetProductInfoShortQuery['productMainInfo'][];
  isFetching: boolean;
}

export default function CatalogueList({
  products,
  isFetching,
}: CatalogueListProps) {
  const itemsEl = products.map((e) => {
    return (
      <li key={e.id}>
        <ProductSmall
          images={e.gallery}
          brand={e.brand}
          name={e.name}
          id={e.id}
          price={e.price}
          discount={e.discount}
          sizes={e.sizes.map(e => e.value)}
          tags={e.tags}
        />
      </li>
    );
  });

  if (!itemsEl.length && !isFetching) {
    return (
      <div className="w-full border-t border-outline-variant py-6 text-center text-3xl font-bold">
        Nothing was found
      </div>
    );
  }

  return (
    <ul className="grid w-full grid-cols-2 gap-2 border-t border-outline-variant py-6 md:grid-cols-3 lg:grid-cols-5">
      {itemsEl}
    </ul>
  );
}
