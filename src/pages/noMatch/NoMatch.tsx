import { useNavigate } from 'react-router-dom';
import { ROUTS } from '../../routs/routs';

enum TEXTS {
  MAIN_TEXT = 'Page not found.',
  HOME_BUTTON = 'Go Home page',
}

function NoMatch() {
  const navigate = useNavigate();

  function handleGoHomePage() {
    navigate(ROUTS.home);
  }

  return (
    <main data-testid="page-404">
      <h1>{TEXTS.MAIN_TEXT}</h1>
      <button type="button" onClick={handleGoHomePage}>
        {TEXTS.HOME_BUTTON}
      </button>
    </main>
  );
}

export default NoMatch;
