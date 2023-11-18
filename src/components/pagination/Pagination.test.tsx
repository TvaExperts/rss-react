import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';
import { routes } from '../../routs/router';

describe('Pagination test. Search parameters updates later(', () => {
  it('Test doesnt work', async () => {
    const { findByTestId } = renderWithRouterAndRedux(null, {
      routes,
      path: '/?page=2&limit=10&query=',
    });

    const nextPage = await findByTestId('next-page');

    await userEvent.click(nextPage);

    await waitFor(() => {
      screen.debug();
      expect(window.location.search).toBe('');
    });
  });
});
