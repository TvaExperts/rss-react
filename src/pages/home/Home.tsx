import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductList from '../../components/productList/ProductList';
import { useAppSelector } from '../../hooks/redux';
import { useGetSearchProductsOnPageQuery } from '../../services/api';
import { useUpdateAppSearchParams } from '../../hooks/useUpdateAppSearchParams';
import { useSetupSearchParams } from '../../hooks/useSetupSearchParams';

function Home() {
  const appSearchParams = useAppSelector(
    (state) => state.appSearchParamsReducer
  );

  useSetupSearchParams();
  useUpdateAppSearchParams();

  useGetSearchProductsOnPageQuery(appSearchParams);

  return (
    <>
      <ProductList />
      <Outlet />
    </>
  );
}

export default Home;
