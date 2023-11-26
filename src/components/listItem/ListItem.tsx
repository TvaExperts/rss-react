import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './ListItem.module.css';
import { ROUTES } from '../../routes/routes';
import IProduct from '../../models/IProduct';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '../../utils/searchParams';

export const DESCRIPTION_LENGTH = 50;

type ListItemProps = {
  product: IProduct;
};

export function ListItem({ product }: ListItemProps) {
  const shortDescription = `${product.description.slice(
    0,
    DESCRIPTION_LENGTH
  )}...`;
  const router = useRouter();
  const appSearchParams = getAppSearchParamsFromQuery(router.query);

  return (
    <li className={styles.listItem}>
      {}
      <Link
        href={`${ROUTES.product}/${product.id}?${createSearchParams(
          appSearchParams
        )}`}
      >
        <span className={styles.title} data-testid="item-title">
          {product.title}
        </span>{' '}
      </Link>
      <span data-testid="item-description"> {shortDescription}</span>
    </li>
  );
}
