import React from 'react';
import { Link } from 'react-router-dom';

enum TEXTS {
  ERROR_TEXT = 'Something went wrong!',
}

function Error() {
  return (
    <main>
      <h1>{TEXTS.ERROR_TEXT}</h1>
      <Link to="/">Go to Home</Link>
    </main>
  );
}

export default Error;
