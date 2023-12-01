import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { formsDataReducer } from './reducers/FormsDataSlice';
import { countriesReducer } from './reducers/CountriesSlice';

const rootReducer = combineReducers({
  formsDataReducer,
  countriesReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
