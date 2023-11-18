import App from './App';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';

describe('App tests', () => {
  it('Verify that app rendering successful', async () => {
    renderWithRedux(<App />);
  });
});
