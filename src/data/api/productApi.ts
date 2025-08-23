import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../domain/entities/Product';
import { mapApiProductToEntity } from '../mappers/productMapper';
import { Category } from '../../domain/entities/Category';
import { mapApiCategoryToEntity } from '../mappers/categoryMapper';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      transformResponse: (response: any) =>
        response.products.map(mapApiProductToEntity),
    }),
    getDiscountProducts: builder.query<Product[], void>({
      query: () => '/products?sortBy=discountPercentage&order=desc',
      transformResponse: (response: any) =>
        response.products.map(mapApiProductToEntity),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/products/categories',
      transformResponse: (response: any) =>
        response.map(mapApiCategoryToEntity),
    }),
    getProductById: builder.query<Product, number>({
      query: id => `/products/${id}`,
      transformResponse: (response: any) => mapApiProductToEntity(response),
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: category => `/products/category/${category}`,
      transformResponse: (response: any) =>
        response.products.map(mapApiProductToEntity),
    }),
    getSearchProducts: builder.query<Product[], string>({
      query: query => `/products/search?q=${query}`,
      transformResponse: (response: any) =>
        response.products.map(mapApiProductToEntity),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetDiscountProductsQuery,
  useGetProductsByCategoryQuery,
  useLazyGetProductsByCategoryQuery,
  useLazyGetSearchProductsQuery,
} = productApi;
