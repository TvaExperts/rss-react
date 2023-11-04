import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import React, { useRef } from 'react';
import styles from './RightBlock.module.css';

import { Product } from '../../types';
import { getProductPromise } from '../../services/api';

type ProductResponse = {
  data: Product;
};

type LoaderData = {
  productResponsePromise: Promise<ProductResponse>;
};

export async function loaderDetails({ params }: LoaderFunctionArgs) {
  return defer({
    productResponsePromise: getProductPromise(params.productId || ''),
  });
}

export function RightBlock() {
  const loaderData = useLoaderData() as LoaderData;

  const navigate = useNavigate();

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseBlock(eventTarget?: EventTarget) {
    if (eventTarget && eventTarget !== overlayRef.current) return;
    navigate(-1);
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => handleCloseBlock(e.target)}
      ref={overlayRef}
      role="presentation"
    >
      <article className={styles.rightBlock}>
        <React.Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={loaderData.productResponsePromise}
            errorElement={<p>Error loading product data!</p>}
          >
            {(productResponse: ProductResponse) => {
              const { title, description } = productResponse.data;
              return (
                <>
                  <p>{title}</p>
                  <p>{description}</p>
                  <button type="button" onClick={() => handleCloseBlock()}>
                    Close
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
