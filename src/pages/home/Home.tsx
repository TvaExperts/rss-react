import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ProductList from '../../components/productList/ProductList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGetSearchProductsOnPageQuery } from '../../services/api';
import { productsActions } from '../../reducers/ProductsSlice';
import { useUpdateAppSearchParams } from '../../hooks/useUpdateAppSearchParams';
import { useSetupSearchParams } from '../../hooks/useSetupSearchParams';

function Home() {
  const dispatch = useAppDispatch();
  const appSearchParams = useAppSelector((state) => state.searchParamsReducer);

  useSetupSearchParams();
  useUpdateAppSearchParams();

  const { data, error, isFetching } =
    useGetSearchProductsOnPageQuery(appSearchParams);

  useEffect(() => {
    if (error) {
      dispatch(productsActions.setError(error.toString()));
    } else if (isFetching) {
      dispatch(productsActions.setLoading());
    } else if (data) {
      dispatch(productsActions.setProducts(data));
    }
  }, [data, dispatch, error, isFetching]);

  return (
    <>
      <ProductList />
      <Outlet />
    </>
  );
}

export default Home;
