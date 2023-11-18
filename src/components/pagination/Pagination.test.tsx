import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { routes } from '../../routs/router';
import { setupStore } from '../../store';

describe('Pagination test. Search parameters updates(', () => {
  it('Should update search params after click button next page', async () => {
    const initSearchParams = '?page=1&query=&limit=10';

    const router = createMemoryRouter(routes, {
      initialEntries: [initSearchParams],
    });

    const store = setupStore();

    const { findByTestId } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const nextPage = await findByTestId('next-page');
    expect(router.state.location.search).toBe(initSearchParams);
    await userEvent.click(nextPage);
    expect(router.state.location.search).not.toBe(initSearchParams);
  });
});
