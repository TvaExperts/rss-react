import './global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routs/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
