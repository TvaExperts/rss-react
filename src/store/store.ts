import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { formsDataSlice } from './formsData.slice';

export function setupStore() {
  return configureStore({
    reducer: { [formsDataSlice.name]: formsDataSlice.reducer },
  });
}

export type RootState = ReturnType<typeof formsDataSlice.reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
