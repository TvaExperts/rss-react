import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useGetProductByIdQuery } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { productActions } from '../../reducers/ProductSlice';

enum TEXTS {
  LOADING = 'Loading...',
  LOADING_ERROR = 'Error loading product data!',
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
      dispatch(productActions.setError());
    } else if (isFetching) {
      dispatch(productActions.setLoading());
    } else if (data) {
      dispatch(productActions.setProduct(data));
    }
  }, [data, dispatch, fetchError, isFetching]);

  const { product, isLoading, isError } = useAppSelector(
    (state) => state.productReducer
  );

  if (isLoading) {
    return <p data-testid="details-loading">{TEXTS.LOADING}</p>;
  }

  if (isError || !product) {
    return <p>{TEXTS.LOADING_ERROR}</p>;
  }

  const { title, description, images } = product;

  return (
    <>
      <h2 data-testid="product-title">{title}</h2>
      <p data-testid="product-description">{description}</p>
      <img src={images[0]} alt={title} />
      <br />
      <button type="button" onClick={onClose} data-testid="details-close">
        {TEXTS.BUTTON_CLOSE}
      </button>
    </>
  );
}
