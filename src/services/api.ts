import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppSearchParams } from '../reducers/ParamsSlise';
import IProduct from '../models/IProduct';

export const BASE_URL = 'https://dummyjson.com/products';

export type ProductsApiResponse = {
  total: number;
  products: IProduct[];
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSearchProductsOnPage: builder.query<
      ProductsApiResponse,
      AppSearchParams
    >({
      query: (appSearchParams) => ({
        url: `/search`,
        params: {
          q: appSearchParams.text,
          limit: appSearchParams.limit,
          skip: (appSearchParams.page - 1) * appSearchParams.limit,
        },
      }),
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetProductByIdQuery, useGetSearchProductsOnPageQuery } =
  productApi;
