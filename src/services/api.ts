import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { AppSearchParams } from '../reducers/ParamsSlice';
import IProduct from '../models/IProduct';

export const BASE_URL = 'https://dummyjson.com/products';

export type ProductsApiResponse = {
  total: number;
  products: IProduct[];
};

export const APP_SEARCH_DEF: AppSearchParams = { page: 1, limit: 10, text: '' };

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

    // getProductById: builder.query<IProduct, string>({
    //   query: (id) => ({ url: `/${id}` }),
    // }),
  }),
});

export const {
  util: { getRunningQueriesThunk },
  useGetSearchProductsOnPageQuery,
} = productApi;
