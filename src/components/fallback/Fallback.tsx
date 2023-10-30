import { TEXTS } from '../../types';

function handleClickReloadPage() {
  window.location.reload();
}

export function Fallback() {
  return (
    <main>
      <p>{TEXTS.ERROR_TEXT}</p>
      <button type="button" onClick={handleClickReloadPage}>
        Reload page
      </button>
    </main>
  );
}
