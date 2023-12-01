/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../data/countries';

type CountriesState = {
  countries: string[];
};

const initialState: CountriesState = {
  countries: COUNTRIES,
};

const CountriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const { reducer: countriesReducer } = CountriesSlice;
