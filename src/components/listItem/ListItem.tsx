import { Link } from 'react-router-dom';
import { Product } from '../../types';
import styles from './ListItem.module.css';
import { ROUTS } from '../../routs/routs';

export const DESCRIPTION_LENGTH = 50;

type ListItemProps = {
  product: Product;
};

export function ListItem({ product }: ListItemProps) {
  const shortDescription = `${product.description.slice(
    0,
    DESCRIPTION_LENGTH
  )}...`;

  return (
    <li className={styles.listItem}>
      <Link to={`${ROUTS.product}/${product.id}`}>
        <span className={styles.title} data-testid="item-title">
          {product.title}
        </span>{' '}
      </Link>
      <span data-testid="item-description"> {shortDescription}</span>
    </li>
  );
}
