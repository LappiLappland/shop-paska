import { randomRange, selectRandomItem, selectRandomItems } from '../helpers/random';
import { ProductType } from '../types/Product';
import { ProductTagType } from '../types/ProductTag';
import brands from './data/brands.json';
import colorsDB from './data/colors.json';
import categoriesFemale from './data/femaleCategories.json';
import loremIpsum from './data/lorem.json';
import categoriesMale from './data/maleCategories.json';
import randomWords from './data/randomWords.json';
import generateRandomReviews from './generateRandomReviews';

export default function generateRandomProducts(
  fromId: number,
  howMany: number,
) {
  const products: ProductType[] = [];
  for (let i = 0; i < howMany; i++) {
    products[i] = createProduct(fromId + i);
  }
  return products;
}

function createProduct(id: number) {
  const sex = selectRandomItem(['M', 'F']) as 'M' | 'F';

  const tags = ['', '', '', '', '', '', '', '', 'new', 'popular', '', '', ''];
  let tag1 = selectRandomItem(tags);
  const tag2 = selectRandomItem(tags);
  if (tag1 === tag2) tag1 = '';

  const categories = sex === 'F' ? categoriesFemale : categoriesMale;
  const subCategory = selectRandomItem(categories);
  const category = selectRandomItem(subCategory.items);

  const price = Math.round(50000 * Math.random());
  const discount = selectRandomItem([
    0, 0, 0, 0, 0, 0.5, 0.25, 0.75, 0.8, 0.15, 0, 0, 0, 0.3, 0, 0, 0, 0, 0,
  ]);

  const colors = selectRandomItems(colorsDB, randomRange(1, 5));
  const sizes = [
    {
      id: '0',
      type: 'european',
      value: 'XS',
      available: true,
    },
    {
      id: '1',
      type: 'european',
      value: 'S',
      available: true,
    },
    {
      id: '2',
      type: 'european',
      value: 'L',
      available: false,
    },
  ];

  const prices = [];
  for (const color of colors) {
    for (const size of sizes) {
      if (Math.random() > 0.8) {
        prices.push({
          colorId: color.id,
          sizeId: size.id,
          price: price + Math.round(price * randomRange(-0.2, 0.2)),
          discount: Math.random() > 0.9 ? discount : 0,
        });
      }
    }
  }

  const product: ProductType = {
    id: id + '',
    sex: sex,
    category: (subCategory.title + '/' + category).toLowerCase(),
    name: selectRandomItem(randomWords) + ' ' + selectRandomItem(randomWords),
    brand: selectRandomItem(brands),
    gallery: [
      selectRandomItem([
        'img/placeholder-tall',
        'img/placeholder-tall2',
        'img/placeholder-tall3',
      ]),
      'img/placeholder-tall',
      'img/placeholder-tall2',
      'img/placeholder-tall3',
      'img/placeholder-tall3',
      'img/placeholder-tall',
      'img/placeholder',
      'img/placeholder2',
      'img/placeholder3'
    ],
    tags: [tag1, tag2].filter((e) => e) as ProductTagType[],
    colors,
    sizes,
    price,
    prices,
    discount,
    description: loremIpsum,
    properties: [
      {
        name: 'Country',
        value: 'China',
      },
      {
        name: 'Material',
        value: 'Cotton',
      },
    ],
    reviews: generateRandomReviews(0, 15),
  };
  return product;
}
