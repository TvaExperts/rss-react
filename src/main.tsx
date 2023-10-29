import ReactDOM from 'react-dom/client';
import { App } from './App';
import ErrorBoundary from './ErrorBoundary';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
