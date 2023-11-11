import React, { isValidElement } from 'react';
import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { AppActions, AppState } from '../../reducers/appReducer';

import { AppContext } from '../../context/AppProvider';

import { initialState } from '../mocks/mockInitialState';

export function renderWithRouterAndContext(
  component: React.ReactNode,
  state: AppState = initialState,
  path: string = '/',
  routes: RouteObject[] = []
) {
  if (!isValidElement(component)) throw new Error('Invalid React Element');

  const route = { element: component, path };

  const router = createMemoryRouter([route, ...routes], {
    initialEntries: [path],
  });
  const mockDispatch: React.Dispatch<AppActions> = () => null;
  const value = { state, dispatch: mockDispatch };

  return render(
    <AppContext.Provider value={value}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
