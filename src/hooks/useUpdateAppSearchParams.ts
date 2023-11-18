import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SEARCH_PARAMETERS } from '../models/searchParameters';
import { useAppDispatch, useAppSelector } from './redux';
import {
  AppSearchParams,
  DEFAULT_LIMIT,
  appSearchParamsActions,
} from '../reducers/ParamsSlise';
import { getQueryFromLS } from '../utils/localStorage';
import { ROUTES } from '../routs/routes';

export function useUpdateAppSearchParams() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { text, limit, page } = useAppSelector(
    (state) => state.searchParamsReducer
  );

  useEffect(() => {
    if (pathname === ROUTES.home) {
      const appSearchParams: AppSearchParams = {
        text: searchParams.get(SEARCH_PARAMETERS.query) ?? getQueryFromLS(),
        limit:
          Number(searchParams.get(SEARCH_PARAMETERS.limit)) || DEFAULT_LIMIT,
        page: Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1,
      };
      dispatch(appSearchParamsActions.setParams(appSearchParams));
    }
  }, [dispatch, limit, page, pathname, searchParams, text]);
}
