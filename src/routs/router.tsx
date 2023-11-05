import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { Fallback } from '../components/fallback/Fallback';
import {
  loaderProductDetails,
  ProductDetails,
} from '../components/productDetails/ProductDetails';
import { ROUTS } from './routs';

const router = createBrowserRouter([
  {
    path: ROUTS.home,
    element: <RootLayout />,
    errorElement: <Fallback />,

    children: [
      {
        path: `${ROUTS.product}/:productId`,
        loader: loaderProductDetails,
        element: <ProductDetails />,
      },
    ],
  },
]);

export { router, ROUTS };
