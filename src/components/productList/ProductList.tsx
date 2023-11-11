import React, { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ListItem } from '../listItem/ListItem';
import Pagination from '../pagination/Pagination';
import styles from './ProductList.module.css';
import { AppContext } from '../../context/AppProvider';

enum TEXTS {
  LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

function ProductList() {
  const { products, total } = useContext(AppContext).state;
  const isLoading = useOutletContext<boolean>();
  return (
    <div className={styles.productListBlock}>
      {isLoading && TEXTS.LOADING}
      {!isLoading && total === 0 && TEXTS.NOT_FOUND}
      {!isLoading && total > 0 && (
        <>
          <Pagination />
          <ul>
            {products.map((product) => {
              return <ListItem product={product} key={product.id} />;
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProductList;
