/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../models/IProduct';

interface ProductState {
  isLoading: boolean;
  error: string;
  product: IProduct | null;
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
    setProduct(state, action: PayloadAction<IProduct>) {
      state.isLoading = false;
      state.error = '';
      state.product = action.payload;
    },
    setLoading(state) {
      state.isLoading = true;
      state.error = '';
      state.product = null;
      return state;
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.product = null;
      return state;
    },
  },
});

export const { reducer: productReducer, actions: productActions } =
  ProductSlice;
