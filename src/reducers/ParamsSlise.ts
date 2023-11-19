/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueryFromLS } from '../utils/localStorage';

export const SEARCH_PARAMETERS = {
  page: 'page',
  limit: 'limit',
  query: 'query',
} as const;

export const DEFAULT_LIMIT = 10;

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

const AppSearchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<AppSearchParams>) {
      return action.payload;
    },
  },
});

export const {
  reducer: appSearchParamsReducer,
  actions: appSearchParamsActions,
} = AppSearchParamsSlice;
