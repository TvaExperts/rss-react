import React, { useContext } from 'react';
import { ListItem } from '../listItem/ListItem';
import Pagination from '../pagination/Pagination';
import styles from './ProductList.module.css';
import { AppContext } from '../../context/AppProvider';

function ProductList() {
  const { products } = useContext(AppContext).state;
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
