import MainContainer from '../components/mainContainer/MainContainer';
import { wrapper } from '../store';

import { getRunningQueriesThunk, productApi } from '../services/api';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
  isEmptySearchParams,
} from '../utils/searchParams';
import { AppSearchParams } from '../models/searchParameters';

export default function Home({ data }) {
  return <MainContainer productsApiResponse={data} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const appSearchParams: AppSearchParams = getAppSearchParamsFromQuery(
      context.query
    );

    if (isEmptySearchParams(context.query)) {
      return {
        redirect: {
          destination: `/?${createSearchParams(appSearchParams)}`,
          permanent: false,
        },
      };
    }

    const { data } = await store.dispatch(
      productApi.endpoints.getSearchProductsOnPage.initiate(appSearchParams)
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data },
    };
  }
);
