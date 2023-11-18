import { useNavigate, useParams } from 'react-router-dom';
import React, { useRef } from 'react';
import styles from './ProductDetails.module.css';

import { ROUTS } from '../../routs/routs';
import { useGetProductByIdQuery } from '../../services/api';

enum TEXTS {
  LOADING = 'Loading...',
  LOADING_ERROR = 'Error loading product data!',
  BUTTON_CLOSE = 'Close',
}

export function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseDetails() {
    navigate(`${ROUTS.home}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) handleCloseDetails();
  }

  const { data: product, isLoading } = useGetProductByIdQuery(productId || '1');

  return (
    <div
      className={styles.overlay}
      onClick={(e) => handleClickOverlay(e.target)}
      ref={overlayRef}
      role="presentation"
    >
      <article className={styles.productDetails} data-testid="product-details">
        {isLoading && <p data-testid="details-loading">{TEXTS.LOADING}</p>}
        {!isLoading && !product && <p>{TEXTS.LOADING_ERROR}</p>}
        {!isLoading && product && (
          <>
            <h2 data-testid="product-title">{product.title}</h2>
            <p data-testid="product-description">{product.description}</p>
            <img src={product.images[0]} alt={product.title} />
            <br />
            <button
              type="button"
              onClick={handleCloseDetails}
              data-testid="details-close"
            >
              {TEXTS.BUTTON_CLOSE}
            </button>
          </>
        )}
      </article>
    </div>
  );
}
