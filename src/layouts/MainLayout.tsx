import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './MainLayout.module.css';
import { Header } from '../components/header/Header';
import { Product } from '../types';
import LeftBlock from '../components/leftBlock/LeftBlock';

enum TEXTS {
  MAIN_LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function MainLayout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header
        setProducts={setProducts}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setTotalProducts={setTotalProducts}
      />

      <main className={styles.main}>
        {isLoading && TEXTS.MAIN_LOADING}
        {!isLoading && !products?.length && TEXTS.NOT_FOUND}
        {!isLoading && products?.length > 0 && (
          <>
            <LeftBlock products={products} totalProducts={totalProducts} />
            <Outlet />
          </>
        )}
      </main>
    </>
  );
}

export default MainLayout;
