import ReactDOM from 'react-dom/client';
import { App } from './App';
import ErrorBoundary from './ErrorBoundary';
import { Fallback } from './components/fallback/Fallback';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <ErrorBoundary fallback={<Fallback />}>
      <App />
    </ErrorBoundary>
  );
}
