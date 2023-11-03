import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import styles from './CardPreview.module.css';
import { stripHTMLTags } from '../../utils/utils';

const DESCRIPTION_LENGTH = 50;

type CardProps = {
  showData: Product;
};

export function CardPreview({ showData }: CardProps) {
  const shortDescription =
    showData.description &&
    stripHTMLTags(showData.description).slice(0, DESCRIPTION_LENGTH);

  const [queryParams] = useSearchParams();
  return (
    <li className={styles.block}>
      <Link to={`/${showData.id}?${queryParams.toString()}`}>
        <span className={styles.title}>{showData.title} </span>{' '}
      </Link>
      {shortDescription ? <span> {shortDescription}...</span> : ''}
    </li>
  );
}
