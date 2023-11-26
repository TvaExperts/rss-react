import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { DESCRIPTION_LENGTH, ListItem } from '../components/listItem/ListItem';
import { mockProduct } from './mocks/mockProduct';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {} };
    },
  };
});

describe('Tests for the List Item component', () => {
  it('Verify that the component renders product info', () => {
    const { getByTestId } = render(<ListItem product={mockProduct} />);

    const titleElement = getByTestId('item-title');
    expect(titleElement).toHaveTextContent(new RegExp(mockProduct.title, 'i'));

    const descriptionElement = getByTestId('item-description');
    const shortDescription = mockProduct.description.slice(
      0,
      DESCRIPTION_LENGTH
    );
    expect(descriptionElement).toHaveTextContent(
      new RegExp(shortDescription, 'i')
    );
  });
});
