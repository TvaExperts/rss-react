import React from 'react';
import { FormDataLine, FormType } from '../../types';
import styles from './DataLine.module.css';

type DataLineProps = {
  dataLine: FormDataLine;
};

function DataLine({ dataLine }: DataLineProps) {
  const { name, country, age, date, formType } = dataLine;
  return (
    <div className={styles.dataLine}>
      <span>{name}</span>
      <span>{country}</span>
      <span>{age}</span>
      <span>{date}</span>
      <span>
        {formType === FormType.uncontrolled ? 'uncontrolled' : 'react hook'}
      </span>
    </div>
  );
}

export default DataLine;
