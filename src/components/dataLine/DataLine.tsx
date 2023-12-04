import React from 'react';
import { FormDataStore } from '../../types';
import styles from './DataLine.module.css';

type DataLineProps = {
  dataLine: FormDataStore;
};

function DataLine({ dataLine }: DataLineProps) {
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
  } = dataLine;
  return (
    <li className={styles.dataLine}>
      {imageBase64 && (
        <img src={imageBase64} alt="name" width="30px" height="30px" />
      )}
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

export default DataLine;
