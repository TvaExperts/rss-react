/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormDataLine } from '../types';

type FormsDataState = {
  dataLines: FormDataLine[];
};

const initialState: FormsDataState = {
  dataLines: [],
};

const FormsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    addLine(state, action: PayloadAction<FormDataLine>) {
      state.dataLines.push(action.payload);
    },
  },
});

export const { reducer: formsDataReducer, actions: formsDataActions } =
  FormsDataSlice;
