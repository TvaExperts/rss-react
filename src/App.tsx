import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Error from './pages/Error';
import { CardShow } from './components/cardShow/CardShow';
import './global.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          path: `/:showId`,
          element: <CardShow />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
