import { ParsedUrlQuery } from 'querystring';
import {
  AppSearchParams,
  DEFAULT_LIMIT,
  SEARCH_PARAMETERS,
} from '../models/searchParameters';

function isEmptySearchParams(parsedUrlQuery: ParsedUrlQuery) {
  const { page, limit, query } = parsedUrlQuery;
  return !(page && limit && query !== undefined);
}

function createSearchParams(appSearchParams: AppSearchParams) {
  const searchParams = new URLSearchParams();
  searchParams.set(SEARCH_PARAMETERS.query, appSearchParams.text);
  searchParams.set(SEARCH_PARAMETERS.page, appSearchParams.page.toString(10));
  searchParams.set(SEARCH_PARAMETERS.limit, appSearchParams.limit.toString(10));
  return searchParams;
}

function getAppSearchParamsFromQuery(parsedUrlQuery: ParsedUrlQuery) {
  const { page, limit, query } = parsedUrlQuery;

  const appSearchParams: AppSearchParams = {
    page: page ? Number(page.toString()) : 1,
    limit: limit ? Number(limit.toString()) : DEFAULT_LIMIT,
    text: query ? query.toString() : '',
  };
  return appSearchParams;
}

export { createSearchParams, isEmptySearchParams, getAppSearchParamsFromQuery };
