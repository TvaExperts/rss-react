import { useRouter } from 'next/router';
import { useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { TODO } from '../../models/Temp';
import styles from '../../styles/detailProduct.module.css';
import { ROUTES } from '../../routes/routes';
import MainContainer from '../../components/mainContainer/MainContainer';

enum TEXTS {
  BUTTON_CLOSE = 'Close',
}

type DetailsPageProps = {
  product: TODO;
  products: TODO[];
  total: number;
};

function DetailsPage({ product, products, total }: DetailsPageProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  function handleCloseDetails() {
    // console.log('Close');
    //  const newSearchParams = createSearchParams(appSearchParams);
    router.push(ROUTES.home);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) {
      handleCloseDetails();
    }
  }

  const { title } = product;

  return (
    <MainContainer productsData={{ products, total }}>
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
          <p data-testid="product-description">{title}</p>
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

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { productId } = context.query;
  const res = await fetch(`${API_URL}/${productId}`);
  const product: TODO = await res.json();
  const res2 = await fetch(API_URL);
  const products: TODO[] = await res2.json();
  return { props: { product, products, total: products.length } };
}

export default DetailsPage;
