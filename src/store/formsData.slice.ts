/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LineDataInStore } from '../types';

type FormsDataState = {
  dataLines: LineDataInStore[];
};

const initialState: FormsDataState = {
  dataLines: [],
};

export const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  selectors: {
    selectFormsData: (store) => store.dataLines,
  },
  reducers: {
    addLine(state, action: PayloadAction<LineDataInStore>) {
      state.dataLines.push(action.payload);
    },
  },
});
