import { useMemo } from 'react';
import { useAppContext } from './useAppContext';
import { SEARCH_PARAMETERS } from '../routs/searchParameters';

export function useAppSearchParams() {
  const { limit, page, query } = useAppContext().state;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set(SEARCH_PARAMETERS.query, query.toString());
    searchParams.set(SEARCH_PARAMETERS.page, page.toString());
    searchParams.set(SEARCH_PARAMETERS.limit, limit.toString());
    return searchParams;
  }, [limit, page, query]);
}
