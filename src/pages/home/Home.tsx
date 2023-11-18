import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ProductList from '../../components/productList/ProductList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGetAllProductsOnPageQuery } from '../../services/api';
import { productsActions } from '../../reducers/ProductsSlice';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';

function Home() {
  const dispatch = useAppDispatch();

  useAppSearchParams();

  const { text, limit, page } = useAppSelector(
    (state) => state.searchParamsReducer
  );

  const { data, error, isLoading } = useGetAllProductsOnPageQuery({
    text,
    limit,
    page,
  });

  useEffect(() => {
    if (error) {
      dispatch(productsActions.setError(error.toString()));
    } else if (isLoading) {
      dispatch(productsActions.setLoading());
    } else if (data) {
      dispatch(productsActions.setProducts(data));
    }
  }, [data, dispatch, error, isLoading]);

  return (
    <>
      <ProductList />
      <Outlet />
    </>
  );
}

export default Home;
