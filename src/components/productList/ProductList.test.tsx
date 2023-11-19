import { vi } from 'vitest';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';
import ProductList from './ProductList';
import { mockArrOf30Products } from '../../tests/mocks/mockArrOf30Products';
import * as api from '../../services/api';

describe('Product List tests', () => {
  it('Component renders the specified number of cards', async () => {
    const { findAllByRole } = renderWithRouterAndRedux(<ProductList />);
    const listItems = await findAllByRole('listitem');
    expect(listItems.length).toBe(mockArrOf30Products.length);
  });

  it('Component renders warning message if no cards are present.', async () => {
    vi.spyOn(api, 'useGetSearchProductsOnPageQuery').mockImplementation(
      vi.fn().mockImplementation(() => {
        return {
          isError: false,
          isFetching: false,
          data: {
            total: 0,
            products: [],
          },
        };
      })
    );

    const { findByText } = renderWithRouterAndRedux(<ProductList />);
    const warningMessageElement = await findByText(
      /Nothing was found, make another request/i
    );
    expect(warningMessageElement).toBeInTheDocument();
  });
});
