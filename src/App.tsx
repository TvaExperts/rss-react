import './global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routs/router';
import { AppProvider } from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
