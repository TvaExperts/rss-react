import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ProductList from '../../components/productList/ProductList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGetSearchProductsOnPageQuery } from '../../services/api';
import { useUpdateAppSearchParams } from '../../hooks/useUpdateAppSearchParams';
import { useSetupSearchParams } from '../../hooks/useSetupSearchParams';
import { productsActions } from '../../reducers/ProductsSlice';

function Home() {
  const dispatch = useAppDispatch();
  const appSearchParams = useAppSelector(
    (state) => state.appSearchParamsReducer
  );

  useSetupSearchParams();
  useUpdateAppSearchParams();

  const { data: productsData } =
    useGetSearchProductsOnPageQuery(appSearchParams);

  useEffect(() => {
    dispatch(productsActions.setProductsData(productsData || null));
  }, [dispatch, productsData]);

  return (
    <>
      <ProductList />
      <Outlet />
    </>
  );
}

export default Home;
