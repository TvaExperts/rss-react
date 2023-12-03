import React from 'react';
import { FormDataLine } from '../../types';
import styles from './DataLine.module.css';

type DataLineProps = {
  dataLine: FormDataLine;
};

function DataLine({ dataLine }: DataLineProps) {
  const { name, country, age, date, image } = dataLine;
  return (
    <div className={styles.dataLine}>
      {image && <img src={image} alt="name" width="30px" height="30px" />}
      <span>{name}</span>
      <span>{country}</span>
      <span>{age}</span>
      <span>{date}</span>
    </div>
  );
}

export default DataLine;
