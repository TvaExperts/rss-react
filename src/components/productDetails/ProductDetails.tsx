import React from 'react';

import { useAppSelector } from '../../hooks/redux';

enum TEXTS {
  LOADING = 'Loading...',
  LOADING_ERROR = 'Error loading product data!',
}

export function ProductDetails() {
  const { isLoading, isError, product } = useAppSelector(
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
    </>
  );
}
