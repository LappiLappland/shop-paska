export interface ProductSizeType {
  id: string;
  type: string;
  value: string;
  available: boolean;
}

export type ProductSizeSmallType = Pick<ProductSizeType, 'value' | 'id'>;
