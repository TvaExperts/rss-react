import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/App';
import ErrorBoundary from './ErrorBoundary';
import { Fallback } from './components/fallback/Fallback';
import { setupStore } from './store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
