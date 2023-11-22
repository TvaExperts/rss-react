// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './redux';
// import { SEARCH_PARAMETERS } from '../models/searchParameters';
// import {
// AppSearchParams,
// DEFAULT_LIMIT,
// appSearchParamsActions,
// } from '../reducers/ParamsSlise';
// import { getQueryFromLS } from '../utils/localStorage';
// import { ROUTES } from '../routes/routes';

// function isEqualParams(paramsA: AppSearchParams, paramsB: AppSearchParams) {
//   return (
//     paramsA.limit === paramsB.limit &&
//     paramsA.page === paramsB.page &&
//     paramsA.text === paramsB.text
//   );
// }

export function useUpdateAppSearchParams() {
  console.log('useUpdateAppSearchParams');
  // const [searchParams] = useSearchParams();
  // const dispatch = useAppDispatch();
  // const { pathname } = useLocation();
  // const appSearchParams = useAppSelector(
  //   (state) => state.appSearchParamsReducer
  // );
  //
  // useEffect(() => {
  //   if (pathname === ROUTES.home) {
  //     const newAppSearchParams: AppSearchParams = {
  //       text: searchParams.get(SEARCH_PARAMETERS.query) ?? getQueryFromLS(),
  //       limit:
  //         Number(searchParams.get(SEARCH_PARAMETERS.limit)) || DEFAULT_LIMIT,
  //       page: Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1,
  //     };
  //     if (!isEqualParams(newAppSearchParams, appSearchParams)) {
  //       dispatch(appSearchParamsActions.setParams(newAppSearchParams));
  //     }
  //   }
  // }, [dispatch, pathname, searchParams, appSearchParams]);
}
