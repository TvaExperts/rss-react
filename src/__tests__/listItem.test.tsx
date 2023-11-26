import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import { DESCRIPTION_LENGTH, ListItem } from '../components/listItem/ListItem';
import { mockProduct } from './mocks/mockProduct';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Tests for the List Item component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    mockRouter.push('/');
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
