import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './ProductDetails.module.css';

import { useGetProductByIdQuery } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { productActions } from '../../reducers/ProductSlice';

enum TEXTS {
  LOADING = 'Loading...',
  BUTTON_CLOSE = 'Close',
}

type ProductDetailsProps = {
  onClose: () => void;
};

export function ProductDetails({ onClose }: ProductDetailsProps) {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const {
    data,
    isFetching,
    error: fetchError,
  } = useGetProductByIdQuery(productId || '1');

  useEffect(() => {
    if (fetchError) {
      dispatch(productActions.setError(fetchError.toString()));
    } else if (isFetching) {
      dispatch(productActions.setLoading());
    } else if (data) {
      dispatch(productActions.setProduct(data));
    }
  }, [data, dispatch, fetchError, isFetching]);

  const { product, isLoading, error } = useAppSelector(
    (state) => state.productReducer
  );

  return (
    <article className={styles.productDetails} data-testid="product-details">
      {isLoading && <p data-testid="details-loading">{TEXTS.LOADING}</p>}
      {!isLoading && !product && <p>{error}</p>}
      {!isLoading && product && (
        <>
          <h2 data-testid="product-title">{product.title}</h2>
          <p data-testid="product-description">{product.description}</p>
          <img src={product.images[0]} alt={product.title} />
          <br />
          <button type="button" onClick={onClose} data-testid="details-close">
            {TEXTS.BUTTON_CLOSE}
          </button>
        </>
      )}
    </article>
  );
}
