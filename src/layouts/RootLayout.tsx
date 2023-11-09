import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './RootLayout.module.css';
import { Header } from '../components/header/Header';
import ProductList from '../components/productList/ProductList';
import { useAppContext } from '../hooks/useAppContext';
import { useAppSearchParams } from '../hooks/useAppSearchParams';
import { ActionTypes } from '../reducers/appReducer';
import { ROUTS } from '../routs/routs';

enum TEXTS {
  LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return (
    <>
      <Header isLoading={isLoading} setIsLoading={setIsLoading} />

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
    </>
  );
}

export default RootLayout;
