import React from 'react';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';
import { vi } from 'vitest';
import { RouteObject } from 'react-router-dom';
import { DESCRIPTION_LENGTH, ListItem } from './ListItem';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { routes } from '../../routs/router';
import { mockProduct } from '../../tests/mocks/mockProduct';

describe('Tests for the Card component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should renders product title and short description', () => {
    const routerObject: RouteObject = {
      element: <ListItem product={mockProduct} />,
      path: '/',
    };
    const { getByTestId } = renderWithRouter(routerObject);

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

  it('Should opens a detailed card component', async () => {
    const routerObject: RouteObject = {
      element: <ListItem product={mockProduct} />,
      path: '/',
    };
    const { getByRole } = renderWithRouter(routerObject, '/', routes);

    const linkElement = getByRole('link');
    await userEvent.click(linkElement);
    const detailsElement = await screen.findByTestId('product-details');
    expect(detailsElement).toBeInTheDocument();
  });

  it('Should additionally send an api request when you click on the card title and go to the product page', async () => {
    const routerObject: RouteObject = {
      element: <ListItem product={mockProduct} />,
      path: '/',
    };

    const { getByRole } = renderWithRouter(routerObject, '/', routes);

    const spyAxiosGet = vi.spyOn(axios, 'get');

    const linkElement = getByRole('link');
    await userEvent.click(linkElement);

    expect(spyAxiosGet).toHaveBeenCalledTimes(1);
  });
});
