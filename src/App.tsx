import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { RightBlock } from './components/rightBlock/RightBlock';
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
          path: `/:showId`,
          element: <RightBlock />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
