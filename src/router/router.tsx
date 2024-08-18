import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from 'layouts/RootLayout';
import { FallbackPage } from 'pages/FallbackPage';
import { UncontrolledFormPage } from 'pages/UncontrolledFormPage';
import { ReactHookFormPage } from 'pages/ReactHookFormPage';
import { HomePage } from 'pages/homePage/HomePage';
import ROUTES from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    errorElement: <FallbackPage />,

    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: ROUTES.uncontrolled,
        element: <UncontrolledFormPage />,
      },
      {
        path: ROUTES.react_forms,
        element: <ReactHookFormPage />,
      },
    ],
  },
]);

export default router;
