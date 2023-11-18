import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routs/routes';

enum TEXTS {
  MAIN_TEXT = 'Page not found.',
  HOME_BUTTON = 'Go Home page',
}

function NoMatch() {
  const navigate = useNavigate();

  function handleGoHomePage() {
    navigate(ROUTES.home);
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
