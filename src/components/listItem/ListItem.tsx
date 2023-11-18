import { Link } from 'react-router-dom';
import IProduct from '../../models/IProduct';
import styles from './ListItem.module.css';
import { ROUTES } from '../../routs/routes';

export const DESCRIPTION_LENGTH = 50;

type ListItemProps = {
  product: IProduct;
};

export function ListItem({ product }: ListItemProps) {
  const shortDescription = `${product.description.slice(
    0,
    DESCRIPTION_LENGTH
  )}...`;

  return (
    <li className={styles.listItem}>
      <Link to={`${ROUTES.product}/${product.id}`}>
        <span className={styles.title} data-testid="item-title">
          {product.title}
        </span>{' '}
      </Link>
      <span data-testid="item-description"> {shortDescription}</span>
    </li>
  );
}
