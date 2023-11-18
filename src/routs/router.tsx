import { createBrowserRouter, RouteObject } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { Fallback } from '../components/fallback/Fallback';
import { ProductDetails } from '../components/productDetails/ProductDetails';
import { ROUTS } from './routs';
import Home from '../pages/home/Home';
import NoMatch from '../pages/noMatch/NoMatch';

const routes: RouteObject[] = [
  {
    path: ROUTS.home,
    element: <RootLayout />,
    errorElement: <Fallback />,
    children: [
      {
        path: ROUTS.home,
        element: <Home />,
        children: [
          {
            path: `${ROUTS.product}/:productId`,
            element: <ProductDetails />,
          },
        ],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
