/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../models/IProduct';

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
    setProduct(state, action: PayloadAction<IProduct>) {
      state.isLoading = false;
      state.isError = false;
      state.product = action.payload;
    },
    setLoading(state) {
      state.isLoading = true;
      state.isError = false;
      state.product = null;
      return state;
    },
    setError(state) {
      state.isLoading = false;
      state.isError = true;
      state.product = null;
      return state;
    },
  },
});

export const { reducer: productReducer, actions: productActions } =
  ProductSlice;
