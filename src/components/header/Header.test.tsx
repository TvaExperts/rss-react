import { userEvent } from '@testing-library/user-event';
import { KEY_IN_LS } from '../../utils/localStorage';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';
import { Header } from './Header';
import { routes } from '../../routs/router';

describe('Header tests', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const { getByTestId } = renderWithRouterAndRedux(<Header />);

    localStorage.removeItem(KEY_IN_LS);
    const typedText = Date.now().toString();
    const input = getByTestId('search-input');
    const button = getByTestId('search-button');
    await userEvent.type(input, typedText);
    await userEvent.click(button);
    const newLocalStorageValue = localStorage.getItem(KEY_IN_LS);

    expect(newLocalStorageValue).toBe(typedText);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const initLsText = Date.now().toString();
    localStorage.setItem(KEY_IN_LS, initLsText);
    const { getByTestId } = renderWithRouterAndRedux(null, { routes });
    const input = getByTestId('search-input');
    expect(input).toHaveValue(initLsText);
  });
});
