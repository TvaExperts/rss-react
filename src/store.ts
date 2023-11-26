import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { productApi } from './services/api';

export type RootState = ReturnType<typeof productApi.reducer>;

export const makeStore = () =>
  configureStore({
    reducer: { [productApi.reducerPath]: productApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore); // , { debug: true }
