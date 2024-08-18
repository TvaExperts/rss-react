import { LineDataInStore } from '../../types';
import styles from './DataLine.module.css';

export function DataLine({ lineData }: { lineData: LineDataInStore }) {
  const {
    name,
    country,
    age,
    date,
    imageBase64,
    formType,
    email,
    gender,
    acceptTC,
  } = lineData;

  return (
    <li className={styles.dataLine}>
      <img className={styles.image} src={imageBase64} alt={`${name}`} />
      <span>{formType}</span>
      <span>{name}</span>
      <span>{age}</span>
      <span>{email}</span>
      <span>{gender}</span>
      <span>{country}</span>
      <span>{date}</span>
      <span>{acceptTC.valueOf()}</span>
    </li>
  );
}
