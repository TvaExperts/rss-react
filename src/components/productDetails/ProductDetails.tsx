import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import React, { useRef } from 'react';
import styles from './ProductDetails.module.css';

import { getProductPromise, ProductApiResponse } from '../../services/api';
import { ROUTS } from '../../routs/routs';

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
  const [searchParams] = useSearchParams();

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
      <article className={styles.productDetails}>
        <React.Suspense fallback={<p>{TEXTS.LOADING}</p>}>
          <Await
            resolve={loaderData.productResponsePromise}
            errorElement={<p>{TEXTS.LOADING_ERROR}</p>}
          >
            {(productApiResponse: ProductApiResponse) => {
              const { title, description, images } = productApiResponse.data;
              return (
                <>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <img src={images[0]} alt={title} />
                  <br />
                  <button type="button" onClick={handleCloseDetails}>
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
