/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '../models/IProduct';
import { ProductsApiResponse } from '../services/api';

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
  reducers: {
    setProducts(state, action: PayloadAction<ProductsApiResponse>) {
      state.isLoading = false;
      state.isError = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
      return state;
    },
    setError(state) {
      state.isLoading = false;
      state.isError = true;
      return state;
    },
    setLoading(state) {
      state.isLoading = true;
      state.isError = false;
      state.products = [];
      state.total = 0;
      return state;
    },
  },
});

export const { reducer: productsReducer, actions: productsActions } =
  ProductsSlice;
