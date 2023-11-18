import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../routs/router';
import '../../global.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
