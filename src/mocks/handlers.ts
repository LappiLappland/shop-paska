/* eslint-disable @typescript-eslint/no-unused-vars */
import { graphql, HttpResponse } from 'msw';
import {
  FilterOptions,
  ProductCartParams,
  Sex,
  SortOptions,
} from '../gql/graphql';
import { getDiscounted } from '../helpers/getDiscounted';
import { shuffleArray } from '../helpers/random';
import { UserType } from '../types/User';
import brands from './data/brands.json';
import categories from './data/categories.json';
import colors from './data/colors.json';
import countries from './data/countries.json';
import maleCategoriesOld from './data/maleCategories.json';
import {
  default as productsDataBase,
  default as productsMock,
} from './data/products.json';
import properties from './data/properties.json';
import usersInitialDataBase from './data/users.json';

// This is fake server, so I didn't put much effort in making this look good and behave 100% correctly
// It does the job, and that's what matters
const productsDataBaseShuffled1 = shuffleArray([...productsDataBase]);

const usersDataBase = usersInitialDataBase as (UserType & {
  password: string;
})[];

export const handlers = [
  graphql.query('GetProductsSmall', ({ query }) => {
    return HttpResponse.json({
      data: {
        products: productsMock,
      },
    });
  }),
  graphql.query('GetSliderProducts', ({ query, variables }) => {
    const productsSex =
      variables.sex === 'any'
        ? productsDataBase
        : productsDataBase.filter((e) => e.sex !== variables.sex);
    const products =
      variables.type === 'sales'
        ? productsSex.slice(0, variables.amount)
        : productsSex.slice(-variables.amount);

    return HttpResponse.json({
      data: {
        sliderProducts: products,
      },
    });
  }),
  graphql.query('GetProductInfo', async ({ query, variables }) => {
    const product = productsDataBase.find((e) => e.id + '' === variables.id);

    //await delay(10000);

    return HttpResponse.json({
      data: {
        productMainInfo: {
          ...product,
        },
      },
    });
  }),
  graphql.query('GetProductInfoShort', ({ query, variables }) => {
    const product = productsDataBase.find((e) => e.id + '' === variables.id);

    return HttpResponse.json({
      data: {
        productMainInfo: {
          ...product,
        },
      },
    });
  }),
  graphql.query('GetFavouriteProducts', ({ query, variables }) => {
    const ids = variables.id as string[];

    return HttpResponse.json({
      data: {
        productsFavourite: productsDataBase.filter((e) =>
          ids.find((id) => e.id === id),
        ),
      },
    });
  }),
  graphql.query('GetSimilarProducts', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        similarProducts: productsDataBaseShuffled1.slice(0, variables.amount),
      },
    });
  }),
  graphql.query('GetProductReviews', ({ query, variables }) => {
    const product = productsDataBase.find((e) => e.id + '' === variables.id);
    const from = +variables.after;
    const to = from + Math.max(+variables.first, 0);
    const reviews = product!.reviews.slice(from, to);

    const ratingObj = product!.reviews.reduce(
      (obj, review) => {
        const rated = review.rating;
        const key = ('s' + rated) as keyof typeof obj;
        return {
          ...obj,
          [key]: obj[key] + 1,
        };
      },
      {
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
        s5: 0,
      },
    );

    return HttpResponse.json({
      data: {
        productReviews: {
          totalCount: product!.reviews.length,
          totalStars: ratingObj,
          reviews: reviews,
        },
      },
    });
  }),
  graphql.query('GetProductReviewsTotal', ({ query, variables }) => {
    const product = productsDataBase.find((e) => e.id + '' === variables.id);

    const ratingObj = product!.reviews.reduce(
      (obj, review) => {
        const rated = review.rating;
        const key = ('s' + rated) as keyof typeof obj;
        return {
          ...obj,
          [key]: obj[key] + 1,
        };
      },
      {
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
        s5: 0,
      },
    );

    return HttpResponse.json({
      data: {
        productReviews: {
          totalCount: product!.reviews.length,
          totalStars: ratingObj,
        },
      },
    });
  }),
  graphql.query('GetProductsSlice', ({ query, variables }) => {
    const sortBy = variables.sort as SortOptions;
    const filters = variables.filters as FilterOptions[];
    const sex = variables.sex as Sex;
    const category = (variables.category as string).toLowerCase();

    const filteredByCategoryAndSex = productsDataBase.filter((e) => {
      const isCategoryCorrect = category.includes('/')
        ? e.category === category
        : e.category.split('/')[0] === category;
      return (isCategoryCorrect || !category) && e.sex === sex;
    });

    const brandFilter = filters.find((e) => e.name.toLowerCase() === 'brands');
    const filteredByBrand = !brandFilter
      ? filteredByCategoryAndSex
      : filteredByCategoryAndSex.filter((e) =>
          brandFilter.values.find((brand) => e.brand.toLowerCase() === brand),
        );

    const priceLowFilter = filters.find((e) => e.name === 'from')?.values ?? 0;
    const priceHighFilter =
      filters.find((e) => e.name === 'to')?.values ?? Infinity;

    const filteredByPrice = filteredByBrand.filter((e) => {
      const realPrice = getDiscounted(e.price, e.discount);
      return realPrice >= +priceLowFilter && realPrice <= +priceHighFilter;
    });

    const sortedByNew =
      sortBy !== 'new'
        ? filteredByPrice
        : filteredByPrice.sort((e) =>
            e.tags.find((tag) => tag === 'new') ? -1 : 0,
          );

    const filteredByProperties = filters.reduce((arr, property) => {
      if (['from', 'to', 'brands', 'color'].find((e) => property.name.toLowerCase() === e)) {
        return arr;
      }

      return arr.filter((product) => {
        const found = product.properties.find((e) => {
          return (
            e.name.toLowerCase() === property.name.toLowerCase() &&
            property.values.find((a) => {
              return a === e.value;
            })
          );
        });
        return found;
      });
    }, sortedByNew);

    const finalProducts = filteredByProperties;

    const from = +variables.after;
    const to = from + Math.max(+variables.first, 0);
    const products = finalProducts.slice(from, to);

    //console.log('sending ', finalProducts, {filteredByBrand, filteredByPrice, sortedByNew, products});

    return HttpResponse.json({
      data: {
        slicedProducts: {
          totalCount: finalProducts.length,
          products: products,
        },
      },
    });
  }),
  graphql.query('GetProductsCart', async ({ query, variables }) => {
    const productsToFind: ProductCartParams[] = variables.products;
    const productsCart = productsToFind.map((toFind) => {
      const product = productsDataBase.find((e) => e.id === toFind.id);

      return {
        product: product,
        selectedColor: product?.colors.find((e) => e.id === toFind.color),
        selectedSize: product?.sizes.find((e) => e.id === toFind.size),
      };
    });

    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('');
    //   }, 5000);
    // })

    return HttpResponse.json({
      data: {
        productsCart,
      },
    });
  }),
  graphql.query('GetCategoryFilters', ({ query, variables }) => {
    const categoryPath = variables.category;
    const categorySex = variables.sex;
    const category = categories.find(
      (e) => e.path === categoryPath && e.sex === categorySex,
    ) ?? {
      properties: ['0', '1', '2', '3', '4'], // If not found specific, using basic filters
    };

    const filters = properties.filter((e) =>
      category.properties.find((prop) => prop === e.id),
    );

    const specialCases = filters.map((filter) => {
      if (filter.id === '3') {
        filter.options = countries.map((e) => ({
          name: e.name,
          value: e.name,
        }));
      }

      if (filter.id === '4') {
        filter.options = colors.map((e) => ({
          name: e.name,
          value: e.hex,
        }));
      }

      return filter;
    });

    const plusBrand = [
      {
        id: 'brand',
        name: 'Brands',
        search: true,
        options: brands.map((e) => {
          return { name: e, value: e.toLowerCase() };
        }),
      },
      ...specialCases,
    ];

    return HttpResponse.json({
      data: {
        categoryFilters: plusBrand,
      },
    });
  }),
  graphql.query('GetAllCategories', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        allCategories: {
          female: maleCategoriesOld,
          male: maleCategoriesOld,
        },
      },
    });
  }),
  graphql.mutation('LoginEmail', ({ variables }) => {
    const email = (variables.email as string).toLowerCase();
    const password = (variables.password as string).toLowerCase();

    const user = usersDataBase.find(
      (e) =>
        e.email.toLowerCase() === email &&
        e.password.toLowerCase() === password,
    );

    if (user) {
      return HttpResponse.json({
        data: {
          loginEmail: {
            token: user?.id,
            user: user,
          },
        },
      });
    } else {
      return HttpResponse.json({
        errors: [
          {
            path: ['loginEmail'],
            message: 'User not found',
          },
        ],
      });
    }
  }),
  graphql.query('GetProfile', ({ variables, cookies }) => {
    //It's not gonna work like that
    //const token = (cookies.token as string)?.toLowerCase();

    const token = localStorage.getItem('token');

    const user = usersDataBase.find((e) => e.id === token);

    if (user) {
      return HttpResponse.json({
        data: {
          profile: user,
        },
      });
    } else {
      return HttpResponse.json({
        errors: [
          {
            path: ['profile'],
            message: 'Token is not valid',
          },
        ],
      });
    }
  }),
  graphql.mutation('ProfileMainMutation', ({ variables, cookies }) => {
    const token = (cookies.token as string)?.toLowerCase();

    const user = usersDataBase.find((e) => e.id === token);

    if (user) {
      const firstName = variables.firstName as string | undefined;
      const lastName = variables.lastName as string | undefined;
      const birth = variables.birth as number | undefined;
      const sex = variables.sex as string | undefined;

      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (birth) {
        user.birth = birth;
      }
      if (sex) {
        user.sex = sex as Sex;
      }

      return HttpResponse.json({
        data: {
          profileMain: user,
        },
      });
    } else {
      return HttpResponse.json({
        errors: [
          {
            path: ['profile'],
            message: 'Token is not valid',
          },
        ],
      });
    }
  }),
  graphql.mutation('LoginPhone', ({ variables }) => {
    return HttpResponse.json({
      data: {
        loginPhone: {
          phone: variables.phone,
        },
      },
    });
  }),
  graphql.mutation('LoginPhoneCode', ({ variables }) => {
    const phone = (variables.phone as string).toLowerCase();
    const code = (variables.code as string).toLowerCase();

    if (code === '197530') {
      const foundUser = usersDataBase.find(
        (e) => e.phone.toLowerCase() === phone,
      );

      let user = foundUser;
      if (!user) {
        user = {
          id: usersDataBase.length + '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          avatar: '',
          phone: phone,
          sex: Sex.None,
          birth: null,
        };
        usersDataBase.push(user);
      }

      return HttpResponse.json({
        data: {
          loginPhoneCode: {
            token: user.id,
            user: user,
          },
        },
      });
    } else {
      return HttpResponse.json({
        errors: [
          {
            path: ['loginPhoneCode'],
            message: 'Code was not valid',
          },
        ],
      });
    }
  }),
];
