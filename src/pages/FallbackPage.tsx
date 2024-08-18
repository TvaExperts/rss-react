import { Link } from 'react-router-dom';
import ROUTES from '../router/routes';

export function FallbackPage() {
  return (
    <>
      <h1>Some Error!</h1>
      <Link to={ROUTES.home}>Go Home</Link>
    </>
  );
}
