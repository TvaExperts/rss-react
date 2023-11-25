import { useRouter } from 'next/router';
import { useRef } from 'react';
import styles from '../../styles/detailProduct.module.css';
import { ROUTES } from '../../routes/routes';
import MainContainer from '../../components/mainContainer/MainContainer';
import IProduct from '../../models/IProduct';
import { wrapper } from '../../store';
import { useAppSelector } from '../../hooks/redux';
import { createSearchParams } from '../../utils/createSearchParams';
import { productApi, ProductsApiResponse } from '../../services/api';

enum TEXTS {
  BUTTON_CLOSE = 'Close',
}

type DetailsPageProps = {
  product: IProduct;
  productsData: ProductsApiResponse;
};

function DetailsPage({ product, productsData }: DetailsPageProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const appSearchParams = useAppSelector(
    (state) => state.appSearchParamsReducer
  );
  function handleCloseDetails() {
    const newSearchParams = createSearchParams(appSearchParams);
    router.push(`${ROUTES.home}?${newSearchParams.toString()}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) {
      handleCloseDetails();
    }
  }

  const { title, description } = product;

  return (
    <MainContainer productsApiResponse={productsData}>
      <div
        className={styles.overlay}
        onClick={(e) => handleClickOverlay(e.target)}
        ref={overlayRef}
        role="presentation"
      >
        <article
          className={styles.productDetails}
          data-testid="product-details"
        >
          <h2 data-testid="product-title">{title}</h2>
          <p data-testid="product-description">{description}</p>
          {/* <img src={images[0]} alt={title} /> */}
          <br />

          <button
            type="button"
            onClick={handleCloseDetails}
            data-testid="details-close"
          >
            {TEXTS.BUTTON_CLOSE}
          </button>
        </article>
      </div>
    </MainContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const appSearchParams = store.getState().appSearchParamsReducer;
    const { data: productsData } = await store.dispatch(
      productApi.endpoints.getSearchProductsOnPage.initiate(appSearchParams)
    );

    const { productId } = context.params;

    const { data: product } = await store.dispatch(
      productApi.endpoints.getProductById.initiate(productId.toString())
    );

    return {
      props: { productsData, product },
    };
  }
);

export default DetailsPage;
