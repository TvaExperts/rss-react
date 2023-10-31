import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import styles from './MainLayout.module.css';
import { Header } from '../components/header/Header';
import { ShowData } from '../types';
import { Home } from '../pages/Home';

function MainLayout() {
  const [showsData, setShowsData] = useState<ShowData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header
        setShowsData={setShowsData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />

      <main className={styles.main}>
        <Home data={showsData} isLoading={isLoading} />
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
