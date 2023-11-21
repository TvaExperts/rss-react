import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import styles from './RootLayout.module.css';

function RootLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
