import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import request from 'graphql-request';
import ProductSmall from '../components/ProductSmall';
import CategoriesNav from '../components/pages/catalogue/categoriesNav';
import CategoryCards from '../components/pages/catalogue/categoryCards';
import SliderLong from '../components/sliderLong/SliderLong';
import { stringUpperStart } from '../helpers/string';
import { pageURL } from '../mocks/browser';
import getSliderProductsQuery from '../queries/GetSliderProducts';

interface CatalogSearch {
  sex: 'menswear' | 'womenswear';
}

export const Route = createFileRoute('/catalog/')({
  component: CatalogComponent,
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    return {
      sex:
        search.sex === 'womenswear' || search.sex === 'menswear'
          ? search.sex
          : 'menswear',
    };
  },
});

function CatalogComponent() {
  const { sex } = Route.useSearch();

  const { data } = useQuery({
    queryKey: ['slider', 'popular', 'menswear', '9'],
    queryFn: async () =>
      request(pageURL, getSliderProductsQuery, {
        type: 'popular',
        sex: 'M',
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
            id={e.id}
            name={e.name}
            price={e.price}
            discount={e.discount}
            sizes={e.sizes.map((e) => e.value)}
            tags={e.tags}
          />
        );
      });

  return (
    <>
      <div className="mt-10 flex">
        <aside className="mr-8 hidden w-[250px] shrink-0 md:block">
          <CategoriesNav sex={sex} />
        </aside>
        <main className="min-w-0 grow">
          <h1 className="text-center text-display-small font-semibold text-on-surface antialiased">
            {stringUpperStart(sex)}
          </h1>
          <CategoryCards sex={sex === 'menswear' ? 'M' : 'F'} />
          <section className="mb-8">
            <h2 className="mb-4 mt-4 text-center text-display-small font-semibold antialiased">
              Bestsellers
            </h2>
            <SliderLong
              showSlides={{
                lg: 4,
                md: 3,
                sm: 2,
              }}
            >
              {sliderItemsEl}
            </SliderLong>
          </section>
        </main>
      </div>
    </>
  );
}
