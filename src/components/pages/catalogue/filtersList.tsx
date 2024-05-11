import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link, getRouteApi, useNavigate } from '@tanstack/react-router';
import request from 'graphql-request';
import { ReactNode, useEffect, useState } from 'react';
import { Sex } from '../../../gql/graphql';
import { pageURL } from '../../../mocks/browser';
import getAllCategoriesQuery from '../../../queries/GetCategories';
import getCategoryFiltersQuery from '../../../queries/GetCategoryFilters';
import Accordion from '../../Accordion';
import Button from '../../Button';
import CheckBoxesBigList from '../../filters/CheckBoxesBigList';
import CheckBoxesList from '../../filters/CheckBoxesList';
import Prices from '../../filters/Prices';

const ColorWrapper = (value: string) => {
  return (
    <div
      className="block h-4 w-4 mr-1.5 cursor-pointer rounded-full"
      style={{ backgroundColor: '#' + value }}
    />
  )
}

interface FiltersListProps {
  path: string;
  sex: Sex;
}

const routeApi = getRouteApi('/catalog/$');

export default function FiltersList({ path, sex }: FiltersListProps) {
  const navigate = useNavigate();
  const [states, setStates] = useState<boolean[][]>([]);
  const [prices, setPrices] = useState({ from: null, to: null });
  const searchParams = routeApi.useSearch();

  const { data, isSuccess } = useQuery({
    queryKey: ['filters', path, sex],
    queryFn: async () =>
      request(pageURL, getCategoryFiltersQuery, {
        category: path,
        sex: sex,
      }),
  });

  const { data: dataCat } = useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      request(pageURL, getAllCategoriesQuery, {}),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess) {
      const states = data!.categoryFilters.reduce<boolean[][]>(
        (states, filter) => {
          return [...states, filter.options.map((filterObj) => {
            const found = searchParams[filter.name] as unknown[];
            if (!found) return false;
            return !!found.find((e) => e === filterObj.value);
          })];
        },
        [],
      );
      setStates(states);
    }
  }, [data]);

  function updateState(id: number, which: number, checked: boolean) {
    const newState = states.map((e) => [...e]);
    newState[id][which] = checked;
    setStates(newState);
  }

  const itemsEl =
    !states.length || !data
      ? []
      : data!.categoryFilters.map((filter, i) => {
          let wrapper: (value: string) => ReactNode = () => null;
          if (filter.name === 'Color') {
            wrapper = ColorWrapper;
          }
          let checkboxEl = (
            <CheckBoxesList
              id={filter.name}
              options={filter.options}
              states={states[i]}
              onChange={(id, checked) => {
                updateState(i, id, checked);
              }}
            />
          );
          if (filter.options.length > 8) {
            checkboxEl = (
              <CheckBoxesBigList
                id={filter.name}
                options={filter.options}
                states={states[i]}
                AddWrapper={wrapper}
                onChange={(id, checked) => {
                  updateState(i, id, checked);
                }}
                shouldLabelLetter={filter.id === 'brand'}
              />
            );
          }

          return (
            <li key={filter.id}>
              <h2 className="mb-2 text-lg">{filter.name}</h2>
              {checkboxEl}
            </li>
          );
        });

  //
  const category = dataCat?.allCategories[sex === 'F' ? 'female' : 'male'].find(
    (e) => e.title.toLowerCase() === path.split('/')[0].toLowerCase(),
  );
  const categoriesItemsEl = !category
    ? []
    : category.items.map((e) => {
        return (
          <li className="mb-1 pl-4 text-body-large" key={e}>
            <Link className="hover:underline" to={'/catalog/' + path + '/' + e}>
              {e}
            </Link>
          </li>
        );
      });

  function applyFilters() {
    navigate({
      search: (prev) => {
        const allFilters = states.reduce((obj, state, i) => {
          const filter = data!.categoryFilters[i];
          const name = filter.name;
          const values = filter.options
            .map((option, j) => (state[j] ? option.value : ''))
            .filter((e) => e);
          if (!values.length) return obj;
          return { ...obj, [name]: values };
        }, {});

        const includePrices: { from?: number; to?: number } = {};
        if (prices.from) {
          includePrices.from = prices.from;
        }
        if (prices.to) {
          includePrices.to = prices.to;
        }

        const keep: { sort?: string; page?: number } = {};
        if ('sort' in prev) {
          keep.sort = prev.sort;
        }

        window.scroll(0, 0);

        return { ...keep, page: 1, ...includePrices, ...allFilters };
      },
    });
  }

  return (
    <div className="mt-2 flex h-full flex-col">
      {!category ? (
        ''
      ) : (
        <Accordion
          titleClassname="text-title-medium shrink-0"
          titles={[category?.title]}
        >
          <ul>{categoriesItemsEl}</ul>
        </Accordion>
      )}

      <ul className="filters-list my-2.5 overflow-y-auto py-2.5 pr-3">
        <li>
          <h2 className="mb-2 text-lg">Prices</h2>
          <Prices
            from={prices.from}
            to={prices.to}
            onChange={(which, value) => {
              setPrices({ ...prices, [which]: value });
            }}
          />
        </li>
        {itemsEl}
      </ul>
      <Button className="shrink-0 text-label-large" onClick={applyFilters}>
        Apply filters
      </Button>
    </div>
  );
}
