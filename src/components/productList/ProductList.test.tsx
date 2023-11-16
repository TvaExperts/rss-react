import { RouteObject } from 'react-router-dom';
import { renderWithRouterAndContext } from '../../tests/helpers/renderWithRouterAndContext';
import { routes } from '../../routs/router';
import { AppState } from '../../reducers/appReducer';
import { mockArrOf10Products } from '../../tests/mocks/mockArrOf10Products';
import ProductList from './ProductList';

const routeObject: RouteObject = {
  element: <ProductList />,
  path: '/',
};

describe('Product List tests', () => {
  it('Component renders the specified number of cards', () => {
    const state: AppState = {
      products: mockArrOf10Products,
      total: mockArrOf10Products.length,
      page: 1,
      limit: 10,
      query: '',
    };

    const { getAllByRole } = renderWithRouterAndContext(
      routeObject,
      routes,
      '/',
      state
    );
    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(mockArrOf10Products.length);
  });

  it('Component renders warning message if no cards are present.', () => {
    const state: AppState = {
      products: [],
      total: 0,
      page: 1,
      limit: 10,
      query: '',
    };

    const { getByText } = renderWithRouterAndContext(
      routeObject,
      routes,
      '/',
      state
    );

    const warningMessageElement = getByText(
      /Nothing was found, make another request/i
    );

    expect(warningMessageElement).toBeInTheDocument();
  });
});
