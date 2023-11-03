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
  const [showsData, setShowsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header
        setShowsData={setShowsData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />

      <main className={styles.main}>
        {isLoading && TEXTS.MAIN_LOADING}
        {!isLoading && !showsData?.length && TEXTS.NOT_FOUND}
        {!isLoading && showsData?.length > 0 && (
          <>
            <LeftBlock showsData={showsData} />
            <Outlet />
          </>
        )}
      </main>
    </>
  );
}

export default MainLayout;
