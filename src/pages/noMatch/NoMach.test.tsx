import { screen } from '@testing-library/react';
import { routes } from '../../routs/router';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';

describe('404 Page tests', () => {
  it("Shouldn't renders 404 page when navigating to a valid route", () => {
    renderWithRouter(null, routes, `/`);
    const page404El = screen.queryByTestId('page-404');
    expect(page404El).not.toBeInTheDocument();
  });

  it('Should renders 404 page when navigating to an invalid route', () => {
    renderWithRouter(null, routes, `/sdfgadsfgds`);
    const page404El = screen.queryByTestId('page-404');
    expect(page404El).toBeInTheDocument();
  });
});
