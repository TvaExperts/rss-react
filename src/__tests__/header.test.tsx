import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { Header } from '../components/header/Header';

const TEMP_TEXT = 'temp_text';
vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: { query: TEMP_TEXT }, push: vi.fn() };
    },
  };
});

describe('Tests for the Header component', () => {
  it('Verify that the Header renders with input, which contains the text from the url', () => {
    const { getByTestId } = render(<Header />);
    const input = getByTestId('search-input');
    expect(input).toHaveValue(TEMP_TEXT);
  });
});
