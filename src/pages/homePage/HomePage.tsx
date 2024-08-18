import React from 'react';

import { useSelector } from 'react-redux';
import { DataLine } from 'components/dataLine/DataLine';
import styles from './HomePage.module.css';
import { formsDataSlice } from '../../store/formsData.slice';

export function HomePage() {
  const dataLines = useSelector(formsDataSlice.selectors.selectFormsData);

  if (dataLines.length === 0) {
    return <h1>No data to display</h1>;
  }

  return (
    <>
      <h1>Home Page</h1>
      <div className={styles.table}>
        {dataLines
          .map((lineData) => {
            return <DataLine lineData={lineData} key={lineData.id} />;
          })
          .reverse()}
      </div>
    </>
  );
}
