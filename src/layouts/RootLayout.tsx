import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './RootLayout.module.css';
import { Header } from '../components/header/Header';
import { Product } from '../types';
import ProductList from '../components/productList/ProductList';

enum TEXTS {
  LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function RootLayout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header
        setProducts={setProducts}
        setTotalProducts={setTotalProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <main className={styles.main}>
        {isLoading && TEXTS.LOADING}
        {!isLoading && totalProducts === 0 && TEXTS.NOT_FOUND}
        {!isLoading && totalProducts > 0 && (
          <>
            <ProductList products={products} totalProducts={totalProducts} />
            <Outlet />
          </>
        )}
      </main>
    </>
  );
}

export default RootLayout;
