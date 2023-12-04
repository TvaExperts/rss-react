/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataStore } from '../types';

type FormsDataState = {
  dataLines: FormDataStore[];
};

const initialState: FormsDataState = {
  dataLines: [],
};

const FormsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    addLine(state, action: PayloadAction<FormDataStore>) {
      state.dataLines.push(action.payload);
    },
  },
});

export const { reducer: formsDataReducer, actions: formsDataActions } =
  FormsDataSlice;
