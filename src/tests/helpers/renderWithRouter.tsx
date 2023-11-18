import React from 'react';
import { render } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryRouter,
  RouteObject,
} from 'react-router-dom';

type RenderWithRouterOptions = {
  routes?: RouteObject[];
  path?: string;
};

export function renderWithRouter(
  component: React.ReactNode,
  options: RenderWithRouterOptions = {}
) {
  const { routes = [], path = '/' } = options;

  const routeObject: RouteObject = {
    element: component,
    path,
  };

  const allRoutes = component ? [routeObject, ...routes] : [...routes];

  const router = createMemoryRouter(allRoutes, {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />);
}
