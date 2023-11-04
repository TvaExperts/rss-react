import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { loaderDetails, RightBlock } from './components/rightBlock/RightBlock';
import './global.css';
import { Fallback } from './components/fallback/Fallback';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <Fallback />,

      children: [
        {
          path: `/:productId`,
          loader: loaderDetails,
          element: <RightBlock />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
