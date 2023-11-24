import React from 'react';

import styles from './ProductList.module.css';
import { ListItem } from '../listItem/ListItem';
import {
  APP_SEARCH_DEF,
  useGetSearchProductsOnPageQuery,
} from '../../services/api';
import IProduct from '../../models/IProduct';

// enum TEXTS {
//   LOADING = 'Loading data...',
//   LOADING_ERROR = 'Error loading product data!',
//   NOT_FOUND = 'Nothing was found, make another request',
// }

function ProductList() {
  const { data: productsData } =
    useGetSearchProductsOnPageQuery(APP_SEARCH_DEF);
  const { products } = productsData;

  // useSetupSearchParams();
  // useUpdateAppSearchParams();
  //
  // const {
  //   data: productsData,
  //   isError,
  //   isFetching,
  // } = useGetSearchProductsOnPageQuery(appSearchParams);
  //
  // useEffect(() => {
  //   dispatch(productsActions.setProductsData(productsData || null));
  // }, [dispatch, productsData]);
  //
  // if (isFetching) {
  // return <div className={styles.productListBlock}>{TEXTS.LOADING}</div>;
  // }
  //
  // return <div className={styles.productListBlock}>{TEXTS.LOADING}</div>;
  // if (isError || !productsData) {
  //   return <div className={styles.productListBlock}>{TEXTS.LOADING_ERROR}</div>;
  // }
  //
  // const { total, products } = productsData;

  // if (total === 0) {
  //   return <div className={styles.productListBlock}>{TEXTS.NOT_FOUND}</div>;
  // }

  return (
    <div className={styles.productListBlock}>
      {/* <Pagination /> */}
      <ul>
        {products.map((product: IProduct) => {
          return <ListItem product={product} key={product.id} />;
        })}
      </ul>
    </div>
  );
}

export default ProductList;
