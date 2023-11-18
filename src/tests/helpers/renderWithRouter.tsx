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

type RenderWithRouterProps = {
  component: React.ReactNode | null;
  options?: RenderWithRouterOptions;
};

export function renderWithRouter({
  component,
  options = {},
}: RenderWithRouterProps) {
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
