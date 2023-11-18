// import { screen } from '@testing-library/react';
// import { RouteObject } from 'react-router-dom';
// import { userEvent } from '@testing-library/user-event';
// import { renderWithRouterAndRedux } from '../../tests/helpers/renderWithRouterAndRedux';
// import { routes } from '../../routs/router';
// import { AppState } from '../../reducers/appReducer';
// import { mockArrOf10Products } from '../../tests/mocks/mockArrOf10Products';
// import Home from '../../pages/home/Home';
//
// const routeObject: RouteObject = {
//   element: <Home />,
//   path: '/',
// };
//
// describe('Pagination test. Search parameters updates later(', () => {
//   it('Test doesnt work', async () => {
//     const state: AppState = {
//       products: mockArrOf10Products,
//       total: 100,
//       page: 1,
//       limit: 10,
//       query: '',
//     };
//
//     const { getByTestId } = renderWithRouterAndRedux(
//       routeObject,
//       routes,
//       '/',
//       state
//     );
//
//     screen.debug();
//     const nextPage = getByTestId('next-page');
//     const initialSearchParams = new URLSearchParams(window.location.search);
//     await userEvent.click(nextPage);
//     const newSearchParams = new URLSearchParams(window.location.search);
//     expect(initialSearchParams.toString()).toBe(newSearchParams.toString());
//   });
// });
