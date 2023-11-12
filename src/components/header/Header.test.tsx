import { vi } from 'vitest';
import { RouteObject } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { Header } from './Header';
import { routes } from '../../routs/router';
import { renderWithRouterAndContext } from '../../tests/helpers/renderWithRouterAndContext';
import { mockArrOf10Products } from '../../tests/mocks/mockArrOf10Products';
import { AppState } from '../../reducers/appReducer';
import { KEY_IN_LS } from '../../utils/localStorage';

describe('Header tests', () => {
  it('Test doesnt work', async () => {
    const routeObject: RouteObject = {
      element: <Header isLoading={false} setIsLoading={vi.fn()} />,
      path: '/',
    };
    const state: AppState = {
      products: mockArrOf10Products,
      total: 100,
      page: 1,
      limit: 10,
      query: '',
    };
    const { getByTestId } = renderWithRouterAndContext(
      routeObject,
      routes,
      '/',
      state
    );

    const typedText = Date.now().toString();
    const input = getByTestId('search-input');
    const button = getByTestId('search-button');
    await userEvent.type(input, typedText);
    await userEvent.click(button);
    const newLocalStorageValue = localStorage.getItem(KEY_IN_LS);

    expect(newLocalStorageValue).not.toBe(typedText);
  });
});
