import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockApiResponseOf30Products } from './mocks/mockApiResponseOf30Products';
import MainContainer from '../components/mainContainer/MainContainer';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {}, push: vi.fn() };
    },
  };
});

describe('Tests for the Main container component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    render(<MainContainer productsApiResponse={mockApiResponseOf30Products} />);

    const listItems = screen.queryAllByRole('listitem');

    expect(listItems.length).toBe(mockApiResponseOf30Products.products.length);
  });
});
