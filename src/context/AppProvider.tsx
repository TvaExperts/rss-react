import React, { createContext, useMemo, useReducer } from 'react';
import { AppActions, appReducer, AppState } from '../reducers/appReducer';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants/searchParams';
import { getQueryFromLS } from '../utils/localStorage';

const initialState: AppState = {
  total: 0,
  products: [],
  query: getQueryFromLS() || '',
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
