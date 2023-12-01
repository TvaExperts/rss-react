import { configureStore } from '@reduxjs/toolkit';
import { formsStoreSliceReducer } from './reducers/FormsDataStoreSlice';

export function setupStore() {
  return configureStore({
    reducer: formsStoreSliceReducer,
  });
}

export type RootState = ReturnType<typeof formsStoreSliceReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
