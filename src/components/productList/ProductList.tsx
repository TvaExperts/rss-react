import React from 'react';

import styles from './ProductList.module.css';
import { ListItem } from '../listItem/ListItem';
import { ProductsApiResponse } from '../../services/api';
import IProduct from '../../models/IProduct';
import Pagination from '../pagination/Pagination';

enum TEXTS {
  NOT_FOUND = 'Nothing was found, make another request',
}

type ProductListProps = {
  productsApiResponse: ProductsApiResponse;
};

function ProductList({ productsApiResponse }: ProductListProps) {
  const { products, total } = productsApiResponse;

  if (total === 0) {
    return <div className={styles.productListBlock}>{TEXTS.NOT_FOUND}</div>;
  }

  return (
    <div className={styles.productListBlock}>
      <Pagination total={total} />
      <ul>
        {products.map((product: IProduct) => {
          return <ListItem product={product} key={product.id} />;
        })}
      </ul>
    </div>
  );
}

export default ProductList;
