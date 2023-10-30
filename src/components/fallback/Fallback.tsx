import React from 'react';
import { TEXTS } from '../../types';

function handleReloadPage() {
  window.location.reload();
}

export class Fallback extends React.Component {
  render() {
    return (
      <main>
        <p>{TEXTS.ERROR_TEXT}</p>
        <button type="button" onClick={handleReloadPage}>
          Reload
        </button>
      </main>
    );
  }
}
