/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../models/IProduct';
import { ProductsApiResponse } from '../services/api';

interface ProductsState {
  isLoading: boolean;
  error: string;
  total: number;
  products: IProduct[];
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
      return state;
    },
    setError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
    setLoading(state) {
      state.isLoading = true;
      state.error = '';
      state.products = [];
      state.total = 0;
      return state;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  ProductsSlice;
