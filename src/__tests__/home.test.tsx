import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import Home from '../pages';
import { mockApiResponseOf30Products } from './mocks/mockApiResponseOf30Products';

const TEMP_TEXT = 'temp_text';
vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: { query: TEMP_TEXT }, push: vi.fn() };
    },
  };
});

describe('Tests for the HomePage', () => {
  it('Verify that the page renders the specified number of cards', () => {
    const { getByTestId } = render(<Home data={mockApiResponseOf30Products} />);
    const input = getByTestId('search-input');
    expect(input).toHaveValue(TEMP_TEXT);
  });
});
