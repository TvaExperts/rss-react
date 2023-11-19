/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import IProduct from '../models/IProduct';
import { productApi } from '../services/api';

interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  total: number;
  products: IProduct[];
}

const initialState: ProductsState = {
  isLoading: false,
  isError: false,
  products: [],
  total: 0,
};

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints?.getSearchProductsOnPage.matchFulfilled,
        (state, { payload: { products, total } }) => {
          state.products = products;
          state.total = total;
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addMatcher(
        productApi.endpoints?.getSearchProductsOnPage.matchRejected,
        (state) => {
          state.products = [];
          state.total = 0;
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        productApi.endpoints?.getSearchProductsOnPage.matchPending,
        (state) => {
          state.products = [];
          state.total = 0;
          state.isLoading = true;
          state.isError = false;
        }
      );
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  ProductsSlice;
