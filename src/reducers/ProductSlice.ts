/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

interface ProductState {
  isLoading: boolean;
  error: string;
  product: Product | null;
}

const initialState: ProductState = {
  isLoading: false,
  error: '',
  product: null,
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<Product>) {
      state.isLoading = false;
      state.error = '';
      state.product = action.payload;
    },
    clearProduct() {
      return initialState;
    },
  },
});

export const { reducer: productReducer, actions: productActions } =
  ProductSlice;
