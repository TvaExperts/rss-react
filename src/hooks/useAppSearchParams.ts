import { useMemo } from 'react';
import { useAppContext } from './useAppContext';
import { SEARCH_PARAMETERS } from '../routs/searchParameters';

export function useAppSearchParams() {
  const { limit, offset, query } = useAppContext().state;

  return useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.set(SEARCH_PARAMETERS.query, query.toString());
    searchParams.set(SEARCH_PARAMETERS.offset, offset.toString());
    searchParams.set(SEARCH_PARAMETERS.limit, limit.toString());
    return searchParams;
  }, [limit, offset, query]);
}
