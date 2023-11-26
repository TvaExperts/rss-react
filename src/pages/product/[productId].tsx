import { useRouter } from 'next/router';
import { useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/detailProduct.module.css';
import { ROUTES } from '../../routes/routes';
import MainContainer from '../../components/mainContainer/MainContainer';
import IProduct from '../../models/IProduct';
import { wrapper } from '../../store';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
  isEmptySearchParams,
} from '../../utils/searchParams';
import { productApi, ProductsApiResponse } from '../../services/api';
import { AppSearchParams } from '../../models/searchParameters';

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

  function handleCloseDetails() {
    const appSearchParams = getAppSearchParamsFromQuery(router.query);
    router.push(`${ROUTES.home}?${createSearchParams(appSearchParams)}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) {
      handleCloseDetails();
    }
  }

  const { title, description, images } = product;

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
          <Image src={images[0]} alt={title} width={300} height={300} />
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
    const appSearchParams: AppSearchParams = getAppSearchParamsFromQuery(
      context.query
    );

    const { productId } = context.params;

    if (isEmptySearchParams(context.query)) {
      return {
        redirect: {
          destination: `${ROUTES.product}/${productId}?${createSearchParams(
            appSearchParams
          )}`,
          permanent: false,
        },
      };
    }

    const { data: productsData } = await store.dispatch(
      productApi.endpoints.getSearchProductsOnPage.initiate(appSearchParams)
    );

    const { data: product } = await store.dispatch(
      productApi.endpoints.getProductById.initiate(productId.toString())
    );

    return {
      props: { productsData, product },
    };
  }
);

export default DetailsPage;
