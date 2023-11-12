import React from 'react';
import { render } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryRouter,
  RouteObject,
} from 'react-router-dom';

export function renderWithRouter(
  routeObject: RouteObject | null,
  routes: RouteObject[] = [],
  path: string = '/'
) {
  const allRoutes = routeObject ? [routeObject, ...routes] : [...routes];

  const router = createMemoryRouter(allRoutes, {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />);
}
