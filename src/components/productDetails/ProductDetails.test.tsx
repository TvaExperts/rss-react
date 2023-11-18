import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { routes } from '../../routs/router';
import { ROUTES } from '../../routs/routes';
import { mockProduct } from '../../tests/mocks/mockProduct';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';

describe('Tests for the Detailed Card component', () => {
  it('Should renders with loader status when open details page', async () => {
    renderWithRouterAndRedux(null, {
      routes,
      path: `${ROUTES.product}/:${mockProduct.id}`,
    });

    const loadingElement = await screen.findByTestId('details-loading');
    expect(loadingElement).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByTestId } = renderWithRouterAndRedux(null, {
      routes,
      path: `${ROUTES.product}/:${mockProduct.id}`,
    });

    const title = await findByTestId('product-title');
    const description = await findByTestId('product-description');

    expect(title.textContent).toBe(mockProduct.title);
    expect(description.textContent).toBe(mockProduct.description);
  });

  it('Should close page when click button close ', async () => {
    const { findByTestId } = renderWithRouterAndRedux(null, {
      routes,
      path: `${ROUTES.product}/:${mockProduct.id}`,
    });

    expect(await findByTestId('product-details')).toBeInTheDocument();
    const closeButton = await findByTestId('details-close');

    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    expect(screen.queryByTestId('product-details')).not.toBeInTheDocument();
  });
});
