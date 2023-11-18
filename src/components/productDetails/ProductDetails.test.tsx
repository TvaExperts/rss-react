import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { routes } from '../../routs/router';
import { ROUTES } from '../../routs/routes';
import { mockProduct } from '../../tests/mocks/mockProduct';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { mockArrOf10Products } from '../../tests/mocks/mockArrOf10Products';

describe('Tests for the Detailed Card component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeAll(() => {
    vi.mock('../../services/api', () => {
      return {
        getProductsFromApi: vi.fn(() => ({
          total: mockArrOf10Products.length,
          products: mockArrOf10Products,
        })),
        getProductPromise: vi.fn(
          () =>
            new Promise((resolve) => {
              setTimeout(() => resolve({ data: mockProduct }), 500);
            })
        ),
      };
    });
  });

  it('Should renders with loader status when open details page', async () => {
    renderWithRouter(null, routes, `${ROUTES.product}/:${mockProduct.id}`);

    const loadingElement = await screen.findByTestId('details-loading');
    expect(loadingElement).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByTestId } = renderWithRouter(
      null,
      routes,
      `${ROUTES.product}/:${mockProduct.id}`
    );

    const title = await findByTestId('product-title');
    const description = await findByTestId('product-description');

    expect(title.textContent).toBe(mockProduct.title);
    expect(description.textContent).toBe(mockProduct.description);
  });

  it('Should close page when click button close ', async () => {
    renderWithRouter(null, routes, `${ROUTES.product}/${mockProduct.id}`);

    const closeButton = await screen.findByTestId('details-close');

    expect(closeButton).toBeInTheDocument();

    expect(screen.queryByTestId('product-details')).toBeInTheDocument();

    await userEvent.click(closeButton);

    expect(screen.queryByTestId('product-details')).not.toBeInTheDocument();
  });
});
