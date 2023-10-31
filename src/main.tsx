import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { Fallback } from './components/fallback/Fallback';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<Fallback />}>
    <App />
  </ErrorBoundary>
);
