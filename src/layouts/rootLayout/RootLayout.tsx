import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'components';
import styles from './RootLayout.module.css';

function RootLayout() {
  return (
    <>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
