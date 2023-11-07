import { Outlet } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import styles from './RootLayout.module.css';
import { Header } from '../components/header/Header';
import ProductList from '../components/productList/ProductList';
import { AppContext } from '../context/AppProvider';

enum TEXTS {
  LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { total } = useContext(AppContext).state;
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
