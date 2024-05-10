import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import request from 'graphql-request';
import BreadCrumbs from '../components/BreadCrumbs';
import FormSelect, { FormSelectOption } from '../components/forms/Select';
import CatalogueList from '../components/pages/catalogue/catalogueList';
import FiltersButton from '../components/pages/catalogue/filtersButton';
import PageSelect from '../components/pages/catalogue/pageSelect';
import { FilterOptions, Sex, SortOptions } from '../gql/graphql';
import useTitle from '../hooks/useTitle';
import getProductsSliceQuery from '../queries/GetProductsSlice';
import { CatalogSortOprionsType } from '../types/CatalogSortOptions';

interface CatalogSearch {
  sort: CatalogSortOprionsType;
  page: number;
  [key: string]: unknown;
}

export const Route = createFileRoute('/catalog/$')({
  component: CatalogComponent,
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    return {
      ...search,
      sort: (search.sort as CatalogSortOprionsType) || 'popular',
      page: Number(search?.page ?? 1),
    };
  },
});

const options: (FormSelectOption & { value: CatalogSortOprionsType })[] = [
  { text: 'Popular', value: 'popular' },
  { text: 'New', value: 'new' },
  { text: 'Trending', value: 'trending' },
];

const productsPerPage = 30;

function CatalogComponent() {
  const { sort: sortFilter, page, ...filters } = Route.useSearch();
  const navigate = useNavigate();

  const paths = Route.useParams()
    ._splat.split('/')
    .map((path) => path[0].toUpperCase() + path.slice(1));
  const sex: Sex = paths[0] === 'Menswear' ? Sex.M : Sex.F;

  useTitle(paths[paths.length - 1]);

  const { data, isFetching } = useQuery({
    queryKey: [
      'catalogue',
      Route.useParams()._splat,
      page,
      sortFilter,
      filters,
    ],
    queryFn: async () => {
      return request('http://localhost:8080/', getProductsSliceQuery, {
        first: productsPerPage,
        after: productsPerPage * (page - 1),
        sex: sex,
        category: paths.slice(1).join('/'),
        sort: sortFilter as SortOptions,
        filters: Object.entries(filters).map((filter) => {
          return {
            name: filter[0],
            values: filter[1],
          };
        }) as FilterOptions[],
      });
    },
    placeholderData: keepPreviousData,
  });

  const maxPages = data
    ? Math.ceil(data.slicedProducts.totalCount / productsPerPage)
    : 0;

  return (
    <>
      <BreadCrumbs
        className="mt-3"
        base="/catalog"
        links={paths.map((e) => ({ name: e, to: e }))}
      />
      <div className="mt-6 grow">
        <div className="mb-4 flex flex-row justify-between">
          <FiltersButton sex={sex} path={paths.slice(1).join('/')} />
          <FormSelect
            className="w-36"
            id="sort"
            label="Sort by"
            options={options}
            selected={sortFilter}
            onChange={(option) =>
              navigate({ search: (prev) => ({ ...prev, sort: option }) })
            }
          />
        </div>
        <CatalogueList
          products={data ? data.slicedProducts.products : []}
          isFetching={isFetching}
        />
        <div className="mb-4">
          {!data || maxPages <= 0 ? (
            ''
          ) : (
            <PageSelect currentPage={page} numberOfPages={maxPages} />
          )}
        </div>
      </div>
    </>
  );
}
