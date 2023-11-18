import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { DESCRIPTION_LENGTH } from './ListItem';
import { routes } from '../../routs/router';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';
import { mockArrOf30Products } from '../../tests/mocks/mockArrOf30Products';
import * as api from '../../services/api';

describe('Tests for the Card component', () => {
  it('Should renders product title and short description', async () => {
    const { findAllByTestId } = renderWithRouterAndRedux(null, {
      routes,
    });

    const titleElement = (await findAllByTestId('item-title'))[0];
    expect(titleElement).toHaveTextContent(
      new RegExp(mockArrOf30Products[0].title, 'i')
    );

    const descriptionElement = (await findAllByTestId('item-description'))[0];
    const shortDescription = mockArrOf30Products[0].description.slice(
      0,
      DESCRIPTION_LENGTH
    );
    expect(descriptionElement).toHaveTextContent(
      new RegExp(shortDescription, 'i')
    );
  });

  it('Should opens a detailed card component when click title', async () => {
    const { findAllByRole } = renderWithRouterAndRedux(null, {
      routes,
    });

    const titleLinkElement = (await findAllByRole('link'))[0];
    await userEvent.click(titleLinkElement);

    const detailsPage = await screen.findByTestId('product-details');
    expect(detailsPage).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchFn = vi.spyOn(api, 'useGetProductByIdQuery');

    const { findAllByRole } = renderWithRouterAndRedux(null, {
      routes,
    });

    const titleLinkElement = (await findAllByRole('link'))[0];
    await userEvent.click(titleLinkElement);

    await screen.findByTestId('product-details');
    expect(fetchFn).toHaveBeenCalled();
  });
});
