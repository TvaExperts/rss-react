// import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { useAppDispatch, useAppSelector } from './redux';
// import { SEARCH_PARAMETERS } from '../models/searchParameters';

// import { ROUTES } from '../routes/routes';

export function useSetupSearchParams() {
  const router = useRouter();
  const params = router.asPath;
  console.log(params);
  // const dispatch = useAppDispatch();
  // const { pathname } = useLocation();
  // const { text, limit, page } = useAppSelector(
  //   (state) => state.appSearchParamsReducer
  // );

  // useEffect(() => {
  //   if (pathname === ROUTES.home && searchParams.size < 3) {
  //     if (searchParams.get(SEARCH_PARAMETERS.query) === null) {
  //       searchParams.set(SEARCH_PARAMETERS.query, text);
  //     }
  //     if (!searchParams.get(SEARCH_PARAMETERS.limit)) {
  //       searchParams.set(SEARCH_PARAMETERS.limit, limit.toString());
  //     }
  //     if (!searchParams.get(SEARCH_PARAMETERS.page)) {
  //       searchParams.set(SEARCH_PARAMETERS.page, page.toString());
  //     }
  //     setSearchParams(searchParams);
  //   }
  // }, [dispatch, limit, page, pathname, searchParams, setSearchParams, text]);
}
