import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { useGetProductByIdQuery } from '../../services/api';
import { productActions } from '../../reducers/ProductSlice';

enum TEXTS {
  LOADING = 'Loading...',
  LOADING_ERROR = 'Error loading product data!',
}

export function ProductDetails() {
  const { productId } = useParams();

  const {
    data: product,
    isFetching,
    isError,
  } = useGetProductByIdQuery(productId || '1');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.setProduct(product || null));
  }, [dispatch, product]);

  if (isFetching) {
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
    </>
  );
}
