/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueryFromLS } from '../utils/localStorage';
import { DEFAULT_LIMIT } from '../constants/searchParams';

export interface AppSearchParams {
  text: string;
  limit: number;
  page: number;
}

const initialState: AppSearchParams = {
  text: getQueryFromLS(),
  limit: DEFAULT_LIMIT,
  page: 1,
};

const SearchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<AppSearchParams>) {
      return action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.text = action.payload;
      return state;
    },
  },
});

export const { reducer: searchParamsReducer, actions: searchParamsActions } =
  SearchParamsSlice;
