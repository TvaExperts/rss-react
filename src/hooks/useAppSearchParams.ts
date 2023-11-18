import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SEARCH_PARAMETERS } from '../routs/searchParameters';
import { useAppDispatch, useAppSelector } from './redux';
import { DEFAULT_LIMIT } from '../constants/searchParams';
import { AppSearchParams, searchParamsActions } from '../reducers/ParamsSlise';
import { getQueryFromLS } from '../utils/localStorage';

export function useAppSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { text, limit, page } = useAppSelector(
    (state) => state.searchParamsReducer
  );

  useEffect(() => {
    if (!searchParams.get(SEARCH_PARAMETERS.query)) {
      searchParams.set(SEARCH_PARAMETERS.query, text);
    }
    if (!searchParams.get(SEARCH_PARAMETERS.limit)) {
      searchParams.set(SEARCH_PARAMETERS.limit, limit.toString());
    }
    if (!searchParams.get(SEARCH_PARAMETERS.page)) {
      searchParams.set(SEARCH_PARAMETERS.page, page.toString());
    }
    setSearchParams(searchParams);
  }, [dispatch, limit, page, pathname, searchParams, setSearchParams, text]);

  useEffect(() => {
    const appSearchParams: AppSearchParams = {
      text: searchParams.get(SEARCH_PARAMETERS.query) || getQueryFromLS(),
      limit: Number(searchParams.get(SEARCH_PARAMETERS.limit)) || DEFAULT_LIMIT,
      page: Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1,
    };
    dispatch(searchParamsActions.setParams(appSearchParams));
  }, [dispatch, limit, page, searchParams, text]);
}
