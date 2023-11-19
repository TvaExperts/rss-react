/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../models/IProduct';
import { productApi } from '../services/api';

interface ProductState {
  isLoading: boolean;
  isError: boolean;
  product: IProduct | null;
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  product: null,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, { payload }: PayloadAction<IProduct | null>) {
      state.product = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints?.getProductById.matchFulfilled,
        (state) => {
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addMatcher(
        productApi.endpoints?.getProductById.matchRejected,
        (state) => {
          state.product = null;
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        productApi.endpoints?.getProductById.matchPending,
        (state) => {
          state.product = null;
          state.isLoading = true;
          state.isError = false;
        }
      );
  },
});

export const { reducer: productReducer, actions: productActions } =
  ProductSlice;
