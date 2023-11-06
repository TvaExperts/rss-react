import React from 'react';
import { ListItem } from '../listItem/ListItem';
import { Product } from '../../types';
import Pagination from '../pagination/Pagination';
import styles from './ProductList.module.css';

type ProductListProps = {
  products: Product[];
  totalProducts: number;
};
function ProductList({ products, totalProducts }: ProductListProps) {
  return (
    <div className={styles.productListBlock}>
      <Pagination totalProducts={totalProducts} />
      <ul>
        {products.map((product) => {
          return <ListItem product={product} key={product.id} />;
        })}
      </ul>
    </div>
  );
}

export default ProductList;
