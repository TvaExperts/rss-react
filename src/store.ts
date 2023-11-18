import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productReducer } from './reducers/ProductSlice';
import { productsReducer } from './reducers/ProductsSlice';
import { productApi } from './services/api';
import { appSearchParamsReducer } from './reducers/ParamsSlise';

const rootReducer = combineReducers({
  productReducer,
  productsReducer,
  searchParamsReducer: appSearchParamsReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export function setupStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
