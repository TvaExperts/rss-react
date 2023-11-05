import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Fallback } from '../components/fallback/Fallback';
import { loaderDetails, RightBlock } from '../components/rightBlock/RightBlock';
import { ROUTS } from './routs';

const router = createBrowserRouter([
  {
    path: ROUTS.HOME,
    element: <MainLayout />,
    errorElement: <Fallback />,

    children: [
      {
        path: `${ROUTS.PRODUCT}/:productId`,
        loader: loaderDetails,
        element: <RightBlock />,
      },
    ],
  },
]);

export { router, ROUTS };
