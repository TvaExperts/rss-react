import { routes } from '../../routs/router';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';

describe('404 Page tests', () => {
  it("Shouldn't renders 404 page when navigating to a valid route", () => {
    const { queryByTestId } = renderWithRouterAndRedux(null, {
      routes,
    });

    const page404El = queryByTestId('page-404');

    expect(page404El).not.toBeInTheDocument();
  });

  it('Should renders 404 page when navigating to an invalid route', () => {
    const { queryByTestId } = renderWithRouterAndRedux(null, {
      routes,
      path: `/sdfgadsfgds`,
    });

    const page404El = queryByTestId('page-404');

    expect(page404El).toBeInTheDocument();
  });
});
