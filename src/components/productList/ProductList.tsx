import React, { useEffect } from 'react';
import { ListItem } from '../listItem/ListItem';
import Pagination from '../pagination/Pagination';
import styles from './ProductList.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useSetupSearchParams } from '../../hooks/useSetupSearchParams';
import { useUpdateAppSearchParams } from '../../hooks/useUpdateAppSearchParams';
import { useGetSearchProductsOnPageQuery } from '../../services/api';
import { productsActions } from '../../reducers/ProductsSlice';

enum TEXTS {
  LOADING = 'Loading data...',
  LOADING_ERROR = 'Error loading product data!',
  NOT_FOUND = 'Nothing was found, make another request',
}

function ProductList() {
  const dispatch = useAppDispatch();
  const appSearchParams = useAppSelector(
    (state) => state.appSearchParamsReducer
  );

  useSetupSearchParams();
  useUpdateAppSearchParams();

  const {
    data: productsData,
    isError,
    isFetching,
  } = useGetSearchProductsOnPageQuery(appSearchParams);

  useEffect(() => {
    dispatch(productsActions.setProductsData(productsData || null));
  }, [dispatch, productsData]);

  if (isFetching) {
    return <div className={styles.productListBlock}>{TEXTS.LOADING}</div>;
  }

  if (isError || !productsData) {
    return <div className={styles.productListBlock}>{TEXTS.LOADING_ERROR}</div>;
  }

  const { total, products } = productsData;

  if (total === 0) {
    return <div className={styles.productListBlock}>{TEXTS.NOT_FOUND}</div>;
  }

  return (
    <div className={styles.productListBlock}>
      <Pagination />
      <ul>
        {products.map((product) => {
          return <ListItem product={product} key={product.id} />;
        })}
      </ul>
    </div>
  );
}

export default ProductList;
