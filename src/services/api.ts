import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppSearchParams } from '../reducers/ParamsSlise';
import IProduct from '../models/IProduct';

const BASE_URL = 'https://dummyjson.com/products';

export type ProductsApiResponse = {
  total: number;
  products: IProduct[];
};

export const productApi = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSearchProductsOnPage: builder.query<
      ProductsApiResponse,
      AppSearchParams
    >({
      query: (searchParams) => ({
        url: `/search?q=${searchParams.text}&limit=${searchParams.limit}&skip=${
          (searchParams.page - 1) * searchParams.limit
        }`,
      }),
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetProductByIdQuery, useGetSearchProductsOnPageQuery } =
  productApi;
