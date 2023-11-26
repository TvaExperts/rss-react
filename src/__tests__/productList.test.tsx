import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import ProductList from '../components/productList/ProductList';
import { mockApiResponseOf30Products } from './mocks/mockApiResponseOf30Products';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Tests for the Product List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    mockRouter.push('/');
    render(<ProductList productsApiResponse={mockApiResponseOf30Products} />);

    const listItems = screen.queryAllByRole('listitem');

    expect(listItems.length).toBe(mockApiResponseOf30Products.products.length);
  });

  it('Check that an appropriate message is displayed if no cards are present.', () => {
    mockRouter.push('/');
    render(<ProductList productsApiResponse={{ products: [], total: 0 }} />);

    const listItems = screen.getByText(
      /Nothing was found, make another request/i
    );

    expect(listItems).toBeInTheDocument();
  });
});
