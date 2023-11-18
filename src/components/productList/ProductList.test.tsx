import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';
import ProductList from './ProductList';
import { mockArrOf30Products } from '../../tests/mocks/mockArrOf30Products';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';

describe('Product List tests', () => {
  it('Component renders the specified number of cards', async () => {
    const initialState = {
      productsReducer: {
        total: mockArrOf30Products.length,
        products: mockArrOf30Products,
        isLoading: false,
        error: '',
      },
      appSearchParamsReducer: {
        limit: 10,
        page: 1,
        query: '',
      },
    };
    const { findAllByRole } = renderWithRouterAndRedux(<ProductList />, {
      initialState,
    });
    const listItems = await findAllByRole('listitem');
    expect(listItems.length).toBe(mockArrOf30Products.length);
  });

  it('Component renders warning message if no cards are present.', () => {
    const initialState = {
      productsReducer: {
        total: 0,
        products: [],
        isLoading: false,
        error: '',
      },
    };
    const { getByText } = renderWithRedux(<ProductList />, initialState);
    const warningMessageElement = getByText(
      /Nothing was found, make another request/i
    );
    expect(warningMessageElement).toBeInTheDocument();
  });
});
