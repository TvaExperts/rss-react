import { ShowData } from '../../types';
import styles from './Card.module.css';
import { stripHTMLTags } from '../../utils/utils';

const DESCRIPTION_LENGTH = 50;

type CardProps = {
  showData: ShowData;
};

export function Card({ showData }: CardProps) {
  const shortDescription =
    showData.description &&
    stripHTMLTags(showData.description).slice(0, DESCRIPTION_LENGTH);

  return (
    <div className={styles.block}>
      <span className={styles.title}>{showData.title} </span>
      {shortDescription ? <span> {shortDescription}...</span> : ''}
    </div>
  );
}
