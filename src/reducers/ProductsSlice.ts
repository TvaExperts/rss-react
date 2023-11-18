/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { ProductsApiResponse } from '../services/oldApi';

interface ProductsState {
  isLoading: boolean;
  error: string;
  total: number;
  products: Product[];
}

const initialState: ProductsState = {
  isLoading: false,
  error: '',
  products: [],
  total: 0,
};

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductsApiResponse>) {
      state.isLoading = false;
      state.error = '';
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setLoading(state) {
      state.isLoading = true;
      state.error = '';
      state.products = [];
      state.total = 0;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  ProductsSlice;
