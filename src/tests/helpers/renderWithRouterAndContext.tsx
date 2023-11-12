import React from 'react';
import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { AppActions } from '../../reducers/appReducer';

import { AppContext, initialState } from '../../context/AppProvider';

export function renderWithRouterAndContext(
  routeObject: RouteObject | null,
  routes: RouteObject[] = [],
  path: string = '/'
) {
  const allRoutes = routeObject ? [routeObject, ...routes] : [...routes];

  const router = createMemoryRouter(allRoutes, {
    initialEntries: [path],
  });

  const mockDispatch: React.Dispatch<AppActions> = () => null;
  const value = { state: initialState, dispatch: mockDispatch };

  return render(
    <AppContext.Provider value={value}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
