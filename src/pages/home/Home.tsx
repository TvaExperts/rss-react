import {
  Outlet,
  useLocation,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import ProductList from '../../components/productList/ProductList';
import { useAppContext } from '../../hooks/useAppContext';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';
import { ActionTypes } from '../../reducers/appReducer';
import { ROUTS } from '../../routs/routs';

enum TEXTS {
  LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function Home() {
  const [hasInitSearchParams, setHasInitSearchParams] =
    useState<boolean>(false);

  const { state, dispatch } = useAppContext();
  const { total } = state;

  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const filledParams = useAppSearchParams();

  useEffect(() => {
    if (!hasInitSearchParams) {
      dispatch({
        type: ActionTypes.setSearchParamsFromUrl,
        payload: searchParams,
      });
      setHasInitSearchParams(true);
    }
  }, [dispatch, hasInitSearchParams, searchParams]);

  useEffect(() => {
    if (pathname === ROUTS.home) setSearchParams(filledParams);
  }, [filledParams, pathname, setSearchParams]);

  const isLoading = useOutletContext<boolean>();

  return (
    <main className={styles.main}>
      {isLoading && TEXTS.LOADING}
      {!isLoading && total === 0 && TEXTS.NOT_FOUND}
      {!isLoading && total > 0 && (
        <>
          <ProductList />
          <Outlet />
        </>
      )}
    </main>
  );
}

export default Home;
