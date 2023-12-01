import React from 'react';

import { DataLine } from 'components/index';
import { useAppSelector } from '../../hooks/redux';
import styles from './Home.module.css';

function Home() {
  const { dataLines } = useAppSelector((state) => state.formsDataReducer);

  if (dataLines.length === 0) {
    return <h1>No data to display</h1>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div className={styles.table}>
        {dataLines
          .map((line) => {
            return <DataLine dataLine={line} key={`${Math.random()}`} />;
          })
          .reverse()}
      </div>
    </div>
  );
}

export default Home;
