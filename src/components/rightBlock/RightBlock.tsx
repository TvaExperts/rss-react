import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import React, { useRef } from 'react';
import styles from './RightBlock.module.css';

import { getProductPromise, ProductApiResponse } from '../../services/api';
import { ROUTS } from '../../routs/routs';

type LoaderData = {
  productResponsePromise: Promise<ProductApiResponse>;
};

export async function loaderDetails({ params }: LoaderFunctionArgs) {
  return defer({
    productResponsePromise: getProductPromise(params.productId || ''),
  });
}

export function RightBlock() {
  const loaderData = useLoaderData() as LoaderData;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseBlock(eventTarget?: EventTarget) {
    if (eventTarget && eventTarget !== overlayRef.current) return;
    navigate(`${ROUTS.HOME}?${searchParams.toString()}`);
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
            {(productApiResponse: ProductApiResponse) => {
              const { title, description } = productApiResponse.data;
              return (
                <>
                  <h2>{title}</h2>
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
