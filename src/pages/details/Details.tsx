import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import styles from './Details.module.css';
import { ROUTES } from '../../routs/routes';
import { ProductDetails } from '../../components/productDetails/ProductDetails';
import { createSearchParams } from '../../utils/createSearchParams';
import { useAppSelector } from '../../hooks/redux';

enum TEXTS {
  BUTTON_CLOSE = 'Close',
}

export default function Details() {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const appSearchParams = useAppSelector(
    (state) => state.appSearchParamsReducer
  );

  function handleCloseDetails() {
    const newSearchParams = createSearchParams(appSearchParams);
    navigate(`${ROUTES.home}?${newSearchParams.toString()}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) {
      handleCloseDetails();
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => handleClickOverlay(e.target)}
      ref={overlayRef}
      role="presentation"
    >
      <article className={styles.productDetails} data-testid="product-details">
        <ProductDetails />
        <button
          type="button"
          onClick={handleCloseDetails}
          data-testid="details-close"
        >
          {TEXTS.BUTTON_CLOSE}
        </button>
      </article>
    </div>
  );
}
