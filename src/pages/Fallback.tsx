import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../router/routes';

function Fallback() {
  return (
    <div>
      <h1>Some Error!</h1>
      <Link to={ROUTES.home}>Go Home</Link>
    </div>
  );
}

export default Fallback;
