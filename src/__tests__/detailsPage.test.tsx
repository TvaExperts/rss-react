import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockApiResponseOf30Products } from './mocks/mockApiResponseOf30Products';
import DetailsPage from '../pages/product/[productId]';
import { mockProduct } from './mocks/mockProduct';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {}, push: vi.fn() };
    },
  };
});

describe('Tests for the Detailed page', () => {
  it('Verify that the component renders the specified number of cards', () => {
    render(
      <DetailsPage
        productsData={mockApiResponseOf30Products}
        product={mockProduct}
      />
    );

    const listItems = screen.queryAllByRole('listitem');

    expect(listItems.length).toBe(mockApiResponseOf30Products.products.length);
  });

  it('Verify that the component renders product info', () => {
    render(
      <DetailsPage
        productsData={mockApiResponseOf30Products}
        product={mockProduct}
      />
    );

    const detailsElement = screen.getByTestId('product-details');
    expect(detailsElement).toBeInTheDocument();

    const titleElement = screen.getByTestId('product-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockProduct.title);

    const descriptionElement = screen.getByTestId('product-description');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(mockProduct.description);
  });
});
