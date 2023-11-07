import { Outlet, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './RootLayout.module.css';
import { Header } from '../components/header/Header';
import ProductList from '../components/productList/ProductList';
import { useAppContext } from '../hooks/useAppContext';
import { useAppSearchParams } from '../hooks/useAppSearchParams';

enum TEXTS {
  LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { total } = useAppContext().state;

  const filledParams = useAppSearchParams();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(filledParams);
  }, [filledParams, searchParams.size, setSearchParams]);

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
