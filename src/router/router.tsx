import { createBrowserRouter } from 'react-router-dom';
import { Home, UncontrolledFormPage, ReactHookFormPage, Fallback } from 'pages';

import { RootLayout } from 'layouts';

import ROUTES from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    errorElement: <Fallback />,

    children: [
      {
        path: ROUTES.home,
        element: <Home />,
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
