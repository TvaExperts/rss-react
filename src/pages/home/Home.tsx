import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import ProductList from '../../components/productList/ProductList';
import { useAppContext } from '../../hooks/useAppContext';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';
import { ActionTypes } from '../../reducers/appReducer';
import { ROUTS } from '../../routs/routs';

function Home() {
  const [hasInitSearchParams, setHasInitSearchParams] =
    useState<boolean>(false);

  const { dispatch } = useAppContext();

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
    <main className={styles.main}>
      <ProductList />
      <Outlet />
    </main>
  );
}

export default Home;
