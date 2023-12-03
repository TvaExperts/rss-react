import React from 'react';
import { FormDataStore } from '../../types';
import styles from './DataLine.module.css';

type DataLineProps = {
  dataLine: FormDataStore;
};

function DataLine({ dataLine }: DataLineProps) {
  const { name, country, age, date, imageBase64, formType } = dataLine;
  return (
    <div className={styles.dataLine}>
      {imageBase64 && (
        <img src={imageBase64} alt="name" width="30px" height="30px" />
      )}
      <span>{formType}</span>
      <span>{name}</span>
      <span>{country}</span>
      <span>{age}</span>
      <span>{date}</span>
    </div>
  );
}

export default DataLine;
