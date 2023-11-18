import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types';
import { AppSearchParams } from '../reducers/ParamsSlise';

const BASE_URL = 'https://dummyjson.com/products';

type ProductsApiResponse = {
  total: number;
  products: Product[];
};

export const productApi = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllProductsOnPage: builder.query<ProductsApiResponse, AppSearchParams>({
      query: (searchParams) => ({
        url: `?q=${searchParams.text}&limit=${searchParams.limit}&skip=${
          (searchParams.page - 1) * searchParams.limit
        }`,
      }),
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetProductByIdQuery, useGetAllProductsOnPageQuery } =
  productApi;
