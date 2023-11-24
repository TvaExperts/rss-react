import MainContainer from '../components/mainContainer/MainContainer';
import {
  APP_SEARCH_DEF,
  getRunningQueriesThunk,
  productApi,
} from '../services/api';
import { wrapper } from '../store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(
      productApi.endpoints.getSearchProductsOnPage.initiate(APP_SEARCH_DEF)
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default function Home() {
  return <MainContainer />;
}
