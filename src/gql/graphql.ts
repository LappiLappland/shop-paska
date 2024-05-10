/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type AuthPhonePayload = {
  __typename?: 'AuthPhonePayload';
  phone: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  female: Array<CategoryItem>;
  male: Array<CategoryItem>;
};

export type CategoryFilter = {
  __typename?: 'CategoryFilter';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  options: Array<CheckboxOption>;
};

export type CategoryItem = {
  __typename?: 'CategoryItem';
  items: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type CheckboxOption = {
  __typename?: 'CheckboxOption';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type FilterOptions = {
  name: Scalars['String']['input'];
  values: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  loginEmail: AuthPayload;
  loginPhone: AuthPhonePayload;
  loginPhoneCode: AuthPayload;
  profileMain?: Maybe<User>;
};


export type MutationLoginEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginPhoneArgs = {
  phone: Scalars['String']['input'];
};


export type MutationLoginPhoneCodeArgs = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationProfileMainArgs = {
  birth?: InputMaybe<Scalars['Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  sex?: InputMaybe<Sex>;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Product = Node & {
  __typename?: 'Product';
  brand: Scalars['String']['output'];
  category: Scalars['String']['output'];
  colors: Array<ProductColor>;
  description: Scalars['String']['output'];
  discount: Scalars['Float']['output'];
  gallery: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  prices: Array<ProductPrice>;
  properties: Array<ProductProperty>;
  sex: Sex;
  sizes: Array<ProductSize>;
  tags: Array<Tag>;
};

export type ProductCart = {
  __typename?: 'ProductCart';
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
};

export type ProductCartParams = {
  color: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  size: Scalars['ID']['input'];
};

export type ProductColor = Node & {
  __typename?: 'ProductColor';
  hex: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ProductPrice = {
  __typename?: 'ProductPrice';
  colorId: Scalars['ID']['output'];
  discount: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  sizeId: Scalars['ID']['output'];
};

export type ProductProperty = Node & {
  __typename?: 'ProductProperty';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ProductReview = Node & {
  __typename?: 'ProductReview';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  user: User;
};

export type ProductSize = Node & {
  __typename?: 'ProductSize';
  available: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ProductsReviews = {
  __typename?: 'ProductsReviews';
  reviews: Array<ProductReview>;
  totalCount: Scalars['Int']['output'];
  totalStars: StarsCounter;
};

export type ProductsSlice = {
  __typename?: 'ProductsSlice';
  products: Array<Product>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: Category;
  allProducts?: Maybe<Array<Maybe<Product>>>;
  categoryFilters: Array<CategoryFilter>;
  productMainInfo: Product;
  productReviews?: Maybe<ProductsReviews>;
  productsCart: Array<ProductCart>;
  productsFavourite: Array<Product>;
  profile: User;
  similarProducts: Array<Product>;
  slicedProducts: ProductsSlice;
  sliderProducts: Array<Product>;
};


export type QueryCategoryFiltersArgs = {
  category: Scalars['String']['input'];
  sex: Sex;
};


export type QueryProductMainInfoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductReviewsArgs = {
  after: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};


export type QueryProductsCartArgs = {
  products: Array<ProductCartParams>;
};


export type QueryProductsFavouriteArgs = {
  id: Array<Scalars['ID']['input']>;
};


export type QuerySimilarProductsArgs = {
  amount: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
};


export type QuerySlicedProductsArgs = {
  after: Scalars['Int']['input'];
  category: Scalars['String']['input'];
  filters?: InputMaybe<Array<FilterOptions>>;
  first: Scalars['Int']['input'];
  sex: Sex;
  sort?: InputMaybe<SortOptions>;
};


export type QuerySliderProductsArgs = {
  amount: Scalars['Int']['input'];
  sex: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export enum Sex {
  Apache = 'Apache',
  F = 'F',
  M = 'M',
  None = 'None'
}

export enum SortOptions {
  New = 'new',
  Popular = 'popular',
  Trending = 'trending'
}

export type StarsCounter = {
  __typename?: 'StarsCounter';
  s1: Scalars['Int']['output'];
  s2: Scalars['Int']['output'];
  s3: Scalars['Int']['output'];
  s4: Scalars['Int']['output'];
  s5: Scalars['Int']['output'];
};

export enum Tag {
  New = 'new',
  Popular = 'popular'
}

export type User = Node & {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  birth?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  sex: Sex;
};

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', allCategories: { __typename?: 'Category', female: Array<{ __typename?: 'CategoryItem', title: string, items: Array<string> }>, male: Array<{ __typename?: 'CategoryItem', title: string, items: Array<string> }> } };

export type GetCategoryFiltersQueryVariables = Exact<{
  category: Scalars['String']['input'];
  sex: Sex;
}>;


export type GetCategoryFiltersQuery = { __typename?: 'Query', categoryFilters: Array<{ __typename?: 'CategoryFilter', id: string, name: string, options: Array<{ __typename?: 'CheckboxOption', name: string, value: string }> }> };

export type GetProductReviewsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  after: Scalars['Int']['input'];
}>;


export type GetProductReviewsQuery = { __typename?: 'Query', productReviews?: { __typename?: 'ProductsReviews', totalCount: number, totalStars: { __typename?: 'StarsCounter', s1: number, s2: number, s3: number, s4: number, s5: number }, reviews: Array<{ __typename?: 'ProductReview', id: string, createdAt: any, rating: number, text: string, user: { __typename?: 'User', id: string, firstName: string, avatar: string } }> } | null };

export type GetProductReviewsTotalQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductReviewsTotalQuery = { __typename?: 'Query', productReviews?: { __typename?: 'ProductsReviews', totalCount: number, totalStars: { __typename?: 'StarsCounter', s1: number, s2: number, s3: number, s4: number, s5: number } } | null };

export type GetProductInfoShortQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductInfoShortQuery = { __typename?: 'Query', productMainInfo: { __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, discount: number, tags: Array<Tag>, sizes: Array<{ __typename?: 'ProductSize', id: string, value: string }> } };

export type GetProductsSliceQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after: Scalars['Int']['input'];
  sex: Sex;
  category: Scalars['String']['input'];
  sort?: InputMaybe<SortOptions>;
  filters?: InputMaybe<Array<FilterOptions> | FilterOptions>;
}>;


export type GetProductsSliceQuery = { __typename?: 'Query', slicedProducts: { __typename?: 'ProductsSlice', totalCount: number, products: Array<{ __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, discount: number, tags: Array<Tag>, sizes: Array<{ __typename?: 'ProductSize', id: string, value: string }> }> } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, avatar: string, phone: string, sex: Sex, birth?: any | null } };

export type GetSimilarProductsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  amount: Scalars['Int']['input'];
}>;


export type GetSimilarProductsQuery = { __typename?: 'Query', similarProducts: Array<{ __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, tags: Array<Tag>, discount: number, sizes: Array<{ __typename?: 'ProductSize', value: string }> }> };

export type GetSliderProductsQueryVariables = Exact<{
  type: Scalars['String']['input'];
  sex: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
}>;


export type GetSliderProductsQuery = { __typename?: 'Query', sliderProducts: Array<{ __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, discount: number, tags: Array<Tag>, sizes: Array<{ __typename?: 'ProductSize', value: string }> }> };

export type LoginEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginEmailMutation = { __typename?: 'Mutation', loginEmail: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string } } };

export type LoginPhoneMutationVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type LoginPhoneMutation = { __typename?: 'Mutation', loginPhone: { __typename?: 'AuthPhonePayload', phone: string } };

export type LoginPhoneCodeMutationVariables = Exact<{
  phone: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type LoginPhoneCodeMutation = { __typename?: 'Mutation', loginPhoneCode: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string } } };

export type ProfileMainMutationMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['Date']['input']>;
  sex?: InputMaybe<Sex>;
}>;


export type ProfileMainMutationMutation = { __typename?: 'Mutation', profileMain?: { __typename?: 'User', firstName: string, lastName: string, birth?: any | null, sex: Sex } | null };

export type GetProductsCartQueryVariables = Exact<{
  products: Array<ProductCartParams> | ProductCartParams;
}>;


export type GetProductsCartQuery = { __typename?: 'Query', productsCart: Array<{ __typename?: 'ProductCart', product: { __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, discount: number, tags: Array<Tag>, prices: Array<{ __typename?: 'ProductPrice', sizeId: string, colorId: string, price: number, discount: number }> }, selectedSize: { __typename?: 'ProductSize', id: string, value: string }, selectedColor: { __typename?: 'ProductColor', id: string, hex: string } }> };

export type GetFavouriteProductsQueryVariables = Exact<{
  id: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type GetFavouriteProductsQuery = { __typename?: 'Query', productsFavourite: Array<{ __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, discount: number, tags: Array<Tag>, description: string, sizes: Array<{ __typename?: 'ProductSize', id: string, type: string, value: string, available: boolean }>, colors: Array<{ __typename?: 'ProductColor', id: string, name: string, hex: string }>, properties: Array<{ __typename?: 'ProductProperty', name: string, value: string }> }> };

export type GetProductInfoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductInfoQuery = { __typename?: 'Query', productMainInfo: { __typename?: 'Product', id: string, name: string, brand: string, gallery: Array<string>, price: number, discount: number, category: string, sex: Sex, tags: Array<Tag>, description: string, prices: Array<{ __typename?: 'ProductPrice', colorId: string, sizeId: string, price: number, discount: number }>, sizes: Array<{ __typename?: 'ProductSize', id: string, type: string, value: string, available: boolean }>, colors: Array<{ __typename?: 'ProductColor', id: string, name: string, hex: string }>, properties: Array<{ __typename?: 'ProductProperty', name: string, value: string }> } };


export const GetAllCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"female"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}},{"kind":"Field","name":{"kind":"Name","value":"male"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetCategoryFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryFilters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sex"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryFilters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryFiltersQuery, GetCategoryFiltersQueryVariables>;
export const GetProductReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalStars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"s1"}},{"kind":"Field","name":{"kind":"Name","value":"s2"}},{"kind":"Field","name":{"kind":"Name","value":"s3"}},{"kind":"Field","name":{"kind":"Name","value":"s4"}},{"kind":"Field","name":{"kind":"Name","value":"s5"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductReviewsQuery, GetProductReviewsQueryVariables>;
export const GetProductReviewsTotalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductReviewsTotal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalStars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"s1"}},{"kind":"Field","name":{"kind":"Name","value":"s2"}},{"kind":"Field","name":{"kind":"Name","value":"s3"}},{"kind":"Field","name":{"kind":"Name","value":"s4"}},{"kind":"Field","name":{"kind":"Name","value":"s5"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductReviewsTotalQuery, GetProductReviewsTotalQueryVariables>;
export const GetProductInfoShortDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductInfoShort"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productMainInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductInfoShortQuery, GetProductInfoShortQueryVariables>;
export const GetProductsSliceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsSlice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sex"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortOptions"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterOptions"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slicedProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsSliceQuery, GetProductsSliceQueryVariables>;
export const GetProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}}]}}]}}]} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const GetSimilarProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSimilarProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"similarProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetSimilarProductsQuery, GetSimilarProductsQueryVariables>;
export const GetSliderProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSliderProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sliderProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetSliderProductsQuery, GetSliderProductsQueryVariables>;
export const LoginEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginEmailMutation, LoginEmailMutationVariables>;
export const LoginPhoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginPhone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginPhone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<LoginPhoneMutation, LoginPhoneMutationVariables>;
export const LoginPhoneCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginPhoneCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginPhoneCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginPhoneCodeMutation, LoginPhoneCodeMutationVariables>;
export const ProfileMainMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileMainMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birth"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sex"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileMain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"birth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birth"}}},{"kind":"Argument","name":{"kind":"Name","value":"sex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}}]}}]}}]} as unknown as DocumentNode<ProfileMainMutationMutation, ProfileMainMutationMutationVariables>;
export const GetProductsCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductsCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"products"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCartParams"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"products"},"value":{"kind":"Variable","name":{"kind":"Name","value":"products"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sizeId"}},{"kind":"Field","name":{"kind":"Name","value":"colorId"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectedColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hex"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsCartQuery, GetProductsCartQueryVariables>;
export const GetFavouriteProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFavouriteProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsFavourite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetFavouriteProductsQuery, GetFavouriteProductsQueryVariables>;
export const GetProductInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productMainInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"prices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"colorId"}},{"kind":"Field","name":{"kind":"Name","value":"sizeId"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hex"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductInfoQuery, GetProductInfoQueryVariables>;