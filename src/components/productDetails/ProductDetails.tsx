import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import React, { useRef } from 'react';
import styles from './ProductDetails.module.css';

import { getProductPromise, ProductApiResponse } from '../../services/api';
import { ROUTS } from '../../routs/routs';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';

enum TEXTS {
  LOADING = 'Loading...',
  LOADING_ERROR = 'Error loading product data!',
  BUTTON_CLOSE = 'Close',
}

type LoaderData = {
  productResponsePromise: Promise<ProductApiResponse>;
};

export async function loaderProductDetails({ params }: LoaderFunctionArgs) {
  return defer({
    productResponsePromise: getProductPromise(params.productId || ''),
  });
}

export function ProductDetails() {
  const loaderData = useLoaderData() as LoaderData;

  const navigate = useNavigate();
  const searchParams = useAppSearchParams();

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseDetails() {
    navigate(`${ROUTS.home}?${searchParams.toString()}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) handleCloseDetails();
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => handleClickOverlay(e.target)}
      ref={overlayRef}
      role="presentation"
    >
      <article className={styles.productDetails} data-testid="product-details">
        <React.Suspense
          fallback={<p data-testid="details-loading">{TEXTS.LOADING}</p>}
        >
          <Await
            resolve={loaderData.productResponsePromise}
            errorElement={<p>{TEXTS.LOADING_ERROR}</p>}
          >
            {(productApiResponse: ProductApiResponse) => {
              const { title, description, images } = productApiResponse.data;
              return (
                <>
                  <h2 data-testid="product-title">{title}</h2>
                  <p data-testid="product-description">{description}</p>
                  <img src={images[0]} alt={title} />
                  <br />
                  <button
                    type="button"
                    onClick={handleCloseDetails}
                    data-testid="details-close"
                  >
                    {TEXTS.BUTTON_CLOSE}
                  </button>
                </>
              );
            }}
          </Await>
        </React.Suspense>
      </article>
    </div>
  );
}
