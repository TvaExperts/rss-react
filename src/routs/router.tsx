import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { Fallback } from '../components/fallback/Fallback';
import { ROUTES } from './routes';
import Home from '../pages/home/Home';
import Details from '../pages/details/Details';
import NoMatch from '../pages/noMatch/NoMatch';

const routes: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <RootLayout />,
    errorElement: <Fallback />,
    children: [
      {
        path: ROUTES.home,
        element: <Home />,
        children: [
          {
            path: `${ROUTES.product}/:productId`,
            element: <Details />,
          },
        ],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
