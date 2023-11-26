import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ProductList from '../components/productList/ProductList';
import { mockApiResponseOf30Products } from './mocks/mockApiResponseOf30Products';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {} };
    },
  };
});

describe('Tests for the Product List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    render(<ProductList productsApiResponse={mockApiResponseOf30Products} />);

    const listItems = screen.queryAllByRole('listitem');

    expect(listItems.length).toBe(mockApiResponseOf30Products.products.length);
  });

  it('Check that an appropriate message is displayed if no cards are present.', () => {
    render(<ProductList productsApiResponse={{ products: [], total: 0 }} />);

    const listItems = screen.getByText(
      /Nothing was found, make another request/i
    );

    expect(listItems).toBeInTheDocument();
  });
});
