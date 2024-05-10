/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetAllCategories {\n    allCategories {\n      female {\n        title\n        items\n      }\n      male {\n        title\n        items\n      }\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  query GetCategoryFilters($category: String!, $sex: Sex!) {\n    categoryFilters(category: $category, sex: $sex) {\n      id\n      name\n      options {\n        name\n        value\n      }\n    }\n  }\n": types.GetCategoryFiltersDocument,
    "\n  query GetProductReviews($id: ID!, $first: Int!, $after: Int!) {\n    productReviews(id: $id, first: $first, after: $after) {\n      totalCount\n      totalStars {\n        s1\n        s2\n        s3\n        s4\n        s5\n      }\n      reviews {\n        id\n        createdAt\n        rating\n        text\n        user {\n          id\n          firstName\n          avatar\n        }\n      }\n    }\n  }\n": types.GetProductReviewsDocument,
    "\n  query GetProductReviewsTotal($id: ID!) {\n    productReviews(id: $id, first: 0, after: 0) {\n      totalCount\n      totalStars {\n        s1\n        s2\n        s3\n        s4\n        s5\n      }\n    }\n  }\n": types.GetProductReviewsTotalDocument,
    "\n  query GetProductInfoShort($id: ID!) {\n    productMainInfo(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      tags\n      sizes {\n        id\n        value\n      }\n    }\n  }\n": types.GetProductInfoShortDocument,
    "\n  query GetProductsSlice($first: Int!, $after: Int!, $sex: Sex!, $category: String!, $sort: SortOptions, $filters: [FilterOptions!]) {\n    slicedProducts(first: $first, after: $after, sex: $sex, category: $category, sort: $sort, filters: $filters) {\n      totalCount\n      products {\n        id\n        name\n        brand\n        gallery\n        price\n        discount\n        tags\n        sizes {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.GetProductsSliceDocument,
    "\n  query GetProfile {\n    profile {\n      id\n      firstName\n      lastName\n      email\n      avatar\n      phone\n      sex\n      birth\n    }\n  }\n": types.GetProfileDocument,
    "\n  query GetSimilarProducts($id: ID!, $amount: Int!) {\n    similarProducts(id: $id, amount: $amount) {\n      id\n      name\n      brand\n      gallery\n      price\n      tags\n      discount\n      sizes {\n        value\n      }\n    }\n  }\n": types.GetSimilarProductsDocument,
    "\n  query GetSliderProducts($type: String!, $sex: String!, $amount: Int!) {\n    sliderProducts(type: $type, sex: $sex, amount: $amount) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      tags\n      sizes {\n        value\n      }\n    }\n  }\n": types.GetSliderProductsDocument,
    "\n  mutation LoginEmail($email: String!, $password: String!) {\n    loginEmail(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n": types.LoginEmailDocument,
    "\n  mutation LoginPhone($phone: String!) {\n    loginPhone(phone: $phone) {\n      phone\n    }\n  }\n": types.LoginPhoneDocument,
    "\n  mutation LoginPhoneCode($phone: String!, $code: String!) {\n    loginPhoneCode(phone: $phone, code: $code) {\n      token\n      user {\n        id\n      }\n    }\n  }\n": types.LoginPhoneCodeDocument,
    "\n  mutation ProfileMainMutation($firstName: String, $lastName: String, $birth: Date, $sex: Sex) {\n    profileMain(firstName: $firstName, lastName: $lastName, birth: $birth, sex: $sex) {\n      firstName\n      lastName\n      birth\n      sex\n    }\n  }\n": types.ProfileMainMutationDocument,
    "\n  query GetProductsCart($products: [ProductCartParams!]!) {\n    productsCart(products: $products) {\n      product {\n        id\n        name\n        brand\n        gallery\n        price\n        discount\n        tags\n        prices {\n          sizeId\n          colorId\n          price\n          discount\n        }\n      }\n      selectedSize {\n        id\n        value\n      }\n      selectedColor {\n        id\n        hex\n      }\n    }\n  }\n": types.GetProductsCartDocument,
    "\n  query GetFavouriteProducts($id: [ID!]!) {\n    productsFavourite(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      sizes {\n        id\n        type\n        value\n        available\n      }\n      tags\n      colors {\n        id\n        name\n        hex\n      }\n      description\n      properties {\n        name\n        value\n      }\n    }\n  }\n": types.GetFavouriteProductsDocument,
    "\n  query GetProductInfo($id: ID!) {\n    productMainInfo(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      prices {\n        colorId\n        sizeId\n        price\n        discount\n      }\n      category\n      sex\n      sizes {\n        id\n        type\n        value\n        available\n      }\n      tags\n      colors {\n        id\n        name\n        hex\n      }\n      description\n      properties {\n        name\n        value\n      }\n    }\n  }\n": types.GetProductInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllCategories {\n    allCategories {\n      female {\n        title\n        items\n      }\n      male {\n        title\n        items\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllCategories {\n    allCategories {\n      female {\n        title\n        items\n      }\n      male {\n        title\n        items\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCategoryFilters($category: String!, $sex: Sex!) {\n    categoryFilters(category: $category, sex: $sex) {\n      id\n      name\n      options {\n        name\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategoryFilters($category: String!, $sex: Sex!) {\n    categoryFilters(category: $category, sex: $sex) {\n      id\n      name\n      options {\n        name\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductReviews($id: ID!, $first: Int!, $after: Int!) {\n    productReviews(id: $id, first: $first, after: $after) {\n      totalCount\n      totalStars {\n        s1\n        s2\n        s3\n        s4\n        s5\n      }\n      reviews {\n        id\n        createdAt\n        rating\n        text\n        user {\n          id\n          firstName\n          avatar\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductReviews($id: ID!, $first: Int!, $after: Int!) {\n    productReviews(id: $id, first: $first, after: $after) {\n      totalCount\n      totalStars {\n        s1\n        s2\n        s3\n        s4\n        s5\n      }\n      reviews {\n        id\n        createdAt\n        rating\n        text\n        user {\n          id\n          firstName\n          avatar\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductReviewsTotal($id: ID!) {\n    productReviews(id: $id, first: 0, after: 0) {\n      totalCount\n      totalStars {\n        s1\n        s2\n        s3\n        s4\n        s5\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductReviewsTotal($id: ID!) {\n    productReviews(id: $id, first: 0, after: 0) {\n      totalCount\n      totalStars {\n        s1\n        s2\n        s3\n        s4\n        s5\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductInfoShort($id: ID!) {\n    productMainInfo(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      tags\n      sizes {\n        id\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductInfoShort($id: ID!) {\n    productMainInfo(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      tags\n      sizes {\n        id\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductsSlice($first: Int!, $after: Int!, $sex: Sex!, $category: String!, $sort: SortOptions, $filters: [FilterOptions!]) {\n    slicedProducts(first: $first, after: $after, sex: $sex, category: $category, sort: $sort, filters: $filters) {\n      totalCount\n      products {\n        id\n        name\n        brand\n        gallery\n        price\n        discount\n        tags\n        sizes {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductsSlice($first: Int!, $after: Int!, $sex: Sex!, $category: String!, $sort: SortOptions, $filters: [FilterOptions!]) {\n    slicedProducts(first: $first, after: $after, sex: $sex, category: $category, sort: $sort, filters: $filters) {\n      totalCount\n      products {\n        id\n        name\n        brand\n        gallery\n        price\n        discount\n        tags\n        sizes {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfile {\n    profile {\n      id\n      firstName\n      lastName\n      email\n      avatar\n      phone\n      sex\n      birth\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    profile {\n      id\n      firstName\n      lastName\n      email\n      avatar\n      phone\n      sex\n      birth\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSimilarProducts($id: ID!, $amount: Int!) {\n    similarProducts(id: $id, amount: $amount) {\n      id\n      name\n      brand\n      gallery\n      price\n      tags\n      discount\n      sizes {\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSimilarProducts($id: ID!, $amount: Int!) {\n    similarProducts(id: $id, amount: $amount) {\n      id\n      name\n      brand\n      gallery\n      price\n      tags\n      discount\n      sizes {\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSliderProducts($type: String!, $sex: String!, $amount: Int!) {\n    sliderProducts(type: $type, sex: $sex, amount: $amount) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      tags\n      sizes {\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSliderProducts($type: String!, $sex: String!, $amount: Int!) {\n    sliderProducts(type: $type, sex: $sex, amount: $amount) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      tags\n      sizes {\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginEmail($email: String!, $password: String!) {\n    loginEmail(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginEmail($email: String!, $password: String!) {\n    loginEmail(email: $email, password: $password) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginPhone($phone: String!) {\n    loginPhone(phone: $phone) {\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation LoginPhone($phone: String!) {\n    loginPhone(phone: $phone) {\n      phone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginPhoneCode($phone: String!, $code: String!) {\n    loginPhoneCode(phone: $phone, code: $code) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginPhoneCode($phone: String!, $code: String!) {\n    loginPhoneCode(phone: $phone, code: $code) {\n      token\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ProfileMainMutation($firstName: String, $lastName: String, $birth: Date, $sex: Sex) {\n    profileMain(firstName: $firstName, lastName: $lastName, birth: $birth, sex: $sex) {\n      firstName\n      lastName\n      birth\n      sex\n    }\n  }\n"): (typeof documents)["\n  mutation ProfileMainMutation($firstName: String, $lastName: String, $birth: Date, $sex: Sex) {\n    profileMain(firstName: $firstName, lastName: $lastName, birth: $birth, sex: $sex) {\n      firstName\n      lastName\n      birth\n      sex\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductsCart($products: [ProductCartParams!]!) {\n    productsCart(products: $products) {\n      product {\n        id\n        name\n        brand\n        gallery\n        price\n        discount\n        tags\n        prices {\n          sizeId\n          colorId\n          price\n          discount\n        }\n      }\n      selectedSize {\n        id\n        value\n      }\n      selectedColor {\n        id\n        hex\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductsCart($products: [ProductCartParams!]!) {\n    productsCart(products: $products) {\n      product {\n        id\n        name\n        brand\n        gallery\n        price\n        discount\n        tags\n        prices {\n          sizeId\n          colorId\n          price\n          discount\n        }\n      }\n      selectedSize {\n        id\n        value\n      }\n      selectedColor {\n        id\n        hex\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFavouriteProducts($id: [ID!]!) {\n    productsFavourite(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      sizes {\n        id\n        type\n        value\n        available\n      }\n      tags\n      colors {\n        id\n        name\n        hex\n      }\n      description\n      properties {\n        name\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFavouriteProducts($id: [ID!]!) {\n    productsFavourite(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      sizes {\n        id\n        type\n        value\n        available\n      }\n      tags\n      colors {\n        id\n        name\n        hex\n      }\n      description\n      properties {\n        name\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductInfo($id: ID!) {\n    productMainInfo(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      prices {\n        colorId\n        sizeId\n        price\n        discount\n      }\n      category\n      sex\n      sizes {\n        id\n        type\n        value\n        available\n      }\n      tags\n      colors {\n        id\n        name\n        hex\n      }\n      description\n      properties {\n        name\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProductInfo($id: ID!) {\n    productMainInfo(id: $id) {\n      id\n      name\n      brand\n      gallery\n      price\n      discount\n      prices {\n        colorId\n        sizeId\n        price\n        discount\n      }\n      category\n      sex\n      sizes {\n        id\n        type\n        value\n        available\n      }\n      tags\n      colors {\n        id\n        name\n        hex\n      }\n      description\n      properties {\n        name\n        value\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;