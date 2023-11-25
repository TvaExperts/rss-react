import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { productApi } from './services/api';
import { appSearchParamsReducer } from './reducers/ParamsSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  appSearchParamsReducer,
  [productApi.reducerPath]: productApi.reducer,
});

const masterReducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore); // , { debug: true }
