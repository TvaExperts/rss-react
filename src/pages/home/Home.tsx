import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductList from '../../components/productList/ProductList';

function Home() {
  return (
    <>
      <ProductList />
      <Outlet />
    </>
  );
}

export default Home;
