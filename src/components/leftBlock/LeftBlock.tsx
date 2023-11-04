import React from 'react';
import { CardPreview } from '../cardPreview/CardPreview';
import { Product } from '../../types';
import Pagination from '../pagination/Pagination';
import styles from './LeftBlock.module.css';

type LeftBlockProps = {
  products: Product[];
  totalProducts: number;
};
function LeftBlock({ products, totalProducts }: LeftBlockProps) {
  return (
    <div className={styles.leftBlock}>
      <Pagination totalProducts={totalProducts} />
      <ul>
        {products.map((product) => {
          return <CardPreview showData={product} key={product.id} />;
        })}
      </ul>
    </div>
  );
}

export default LeftBlock;
