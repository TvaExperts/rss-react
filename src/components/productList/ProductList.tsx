import React from 'react';
import { ListItem } from '../listItem/ListItem';
import Pagination from '../pagination/Pagination';
import styles from './ProductList.module.css';
import { useAppSelector } from '../../hooks/redux';

enum TEXTS {
  LOADING = 'Loading data...',
  LOADING_ERROR = 'Error loading product data!',
  NOT_FOUND = 'Nothing was found, make another request',
}

function ProductList() {
  const { products, total, isLoading, isError } = useAppSelector(
    (state) => state.productsReducer
  );

  if (isError) {
    return <div className={styles.productListBlock}>{TEXTS.LOADING_ERROR}</div>;
  }

  if (isLoading) {
    return <div className={styles.productListBlock}>{TEXTS.LOADING}</div>;
  }

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
