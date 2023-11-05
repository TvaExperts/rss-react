enum TEXTS {
  ERROR_TEXT = 'Something went wrong!',
  RELOAD_BUTTON = 'Reload page',
}

function handleClickReloadPage() {
  window.location.reload();
}

export function Fallback() {
  return (
    <main>
      <p>{TEXTS.ERROR_TEXT}</p>
      <button type="button" onClick={handleClickReloadPage}>
        {TEXTS.RELOAD_BUTTON}
      </button>
    </main>
  );
}
