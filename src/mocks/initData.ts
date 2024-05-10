import { writeFileSync } from 'fs';
import generateRandomProducts from './generateRandomProducts';

const generateAmount = +process.argv[2] ?? 50;

const productsDataBase = generateRandomProducts(15, generateAmount);

writeFileSync(
  './src/mocks/data/products.json',
  JSON.stringify(productsDataBase),
);
