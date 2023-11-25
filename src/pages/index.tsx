import { ParsedUrlQuery } from 'querystring';
import MainContainer from '../components/mainContainer/MainContainer';
import { wrapper } from '../store';
import {
  AppSearchParams,
  appSearchParamsActions,
  DEFAULT_LIMIT,
} from '../reducers/ParamsSlice';
import { getProductsFromApi } from '../services/api-axios';

function isEmptySearchParams(parsedUrlQuery: ParsedUrlQuery) {
  const { page, limit, query } = parsedUrlQuery;
  return !(page && limit && query !== undefined);
}

function fillSearchParams(
  parsedUrlQuery: ParsedUrlQuery,
  appSearchParams: AppSearchParams
) {
  const { page, limit, query } = parsedUrlQuery;
  const newSearchParams = new URLSearchParams();
  newSearchParams.set(
    'page',
    page ? page.toString() : appSearchParams.page.toString(10)
  );
  newSearchParams.set(
    'limit',
    limit ? limit.toString() : appSearchParams.limit.toString(10)
  );
  newSearchParams.set('query', query?.toString() || appSearchParams.text);
  return newSearchParams;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    if (isEmptySearchParams(context.query)) {
      const appSearchParams = store.getState().appSearchParamsReducer;
      const newSearchParams = fillSearchParams(context.query, appSearchParams);

      return {
        redirect: {
          destination: `/?${newSearchParams.toString()}`,
          permanent: false,
        },
      };
    }

    const { page, limit, query } = context.query;

    const appSearchParams: AppSearchParams = {
      page: page ? Number(page.toString()) : 1,
      limit: limit ? Number(limit.toString()) : DEFAULT_LIMIT,
      text: query ? query.toString() : '',
    };
    store.dispatch(appSearchParamsActions.setParams(appSearchParams));

    const data = await getProductsFromApi(appSearchParams);

    return {
      props: { data },
    };
  }
);

export default function Home({ data }) {
  return <MainContainer productsApiResponse={data} />;
}
