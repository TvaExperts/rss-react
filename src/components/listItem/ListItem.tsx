import { Link } from 'react-router-dom';
import { Product } from '../../types';
import styles from './ListItem.module.css';
import { ROUTS } from '../../routs/routs';

const DESCRIPTION_LENGTH = 50;

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
        <span className={styles.title}>{product.title} </span>
      </Link>
      <span> {shortDescription}</span>
    </li>
  );
}
