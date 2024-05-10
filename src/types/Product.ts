import { ProductColorType } from './ProductColor';
import { ProductPropertyType } from './ProductProperty';
import { ProductReviewType } from './ProductReview';
import { ProductSizeSmallType, ProductSizeType } from './ProductSize';
import { ProductTagType } from './ProductTag';

export interface ProductType {
  id: string;
  sex: 'F' | 'M';
  category: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
  gallery: string[];
  prices: {
    colorId: string;
    sizeId: string;
    price: number;
    discount: number;
  }[];
  tags: ProductTagType[];
  colors: ProductColorType[];
  sizes: ProductSizeType[];
  description: string;
  properties: ProductPropertyType[];
  reviews: ProductReviewType[];
}

export type ProductSmallType = Pick<
  ProductType,
  'id' | 'name' | 'gallery' | 'brand' | 'price' | 'discount' | 'tags'
> & {
  sizes: ProductSizeSmallType[];
};
