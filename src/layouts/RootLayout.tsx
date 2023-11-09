import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { Header } from '../components/header/Header';

function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header isLoading={isLoading} setIsLoading={setIsLoading} />
      <Outlet context={isLoading} />
    </>
  );
}

export default RootLayout;
