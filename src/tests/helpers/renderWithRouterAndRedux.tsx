import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import { setupStore } from '../../store';

type RenderWithRouterAndReduxOptions = {
  routes?: RouteObject[];
  path?: string;
  initialState?: object;
};

export function renderWithRouterAndRedux(
  component: React.ReactNode | null,
  options: RenderWithRouterAndReduxOptions = {}
) {
  const { routes = [], path = '/', initialState = {} } = options;

  const routeObject: RouteObject = {
    element: component,
    path,
  };

  const allRoutes = component ? [routeObject, ...routes] : [...routes];

  const router = createMemoryRouter(allRoutes, {
    initialEntries: [path],
  });

  const store = setupStore(initialState);

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
