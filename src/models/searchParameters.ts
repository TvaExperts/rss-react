const SEARCH_PARAMETERS = {
  page: 'page',
  limit: 'limit',
  query: 'query',
} as const;

const DEFAULT_LIMIT = 10;

interface AppSearchParams {
  text: string;
  limit: number;
  page: number;
}

export { SEARCH_PARAMETERS, DEFAULT_LIMIT };
export type { AppSearchParams };
