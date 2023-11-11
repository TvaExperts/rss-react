import { vi } from 'vitest';
import ProductList from './ProductList';
import { renderWithRouterAndContext } from '../../tests/helpers/renderWithRouterAndContext';
import { AppState } from '../../reducers/appReducer';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/searchParams';

describe('Product List tests', () => {
  it('Component renders the specified number of cards', () => {
    const { queryAllByRole } = renderWithRouterAndContext(<ProductList />);
    const listItems = queryAllByRole('listitem');
    expect(listItems.length).toBe(10);
  });

  it('Component renders warning message if no cards are present.', () => {
    const initialState: AppState = {
      total: 0,
      products: [],
      query: '',
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET,
    };

    const { getByText } = renderWithRouterAndContext(
      <ProductList />,
      initialState
    );

    const warningMessageElement = getByText(
      /Nothing was found, make another request/i
    );

    expect(warningMessageElement).toBeInTheDocument();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
