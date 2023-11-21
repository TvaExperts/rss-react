import { AppSearchParams } from '../reducers/ParamsSlise';
import { SEARCH_PARAMETERS } from '../models/searchParameters';

export function createSearchParams(appSearchParams: AppSearchParams) {
  const searchParams = new URLSearchParams();
  searchParams.set(SEARCH_PARAMETERS.query, appSearchParams.text);
  searchParams.set(SEARCH_PARAMETERS.page, appSearchParams.page.toString(10));
  searchParams.set(SEARCH_PARAMETERS.limit, appSearchParams.limit.toString(10));
  return searchParams;
}
