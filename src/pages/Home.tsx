import React from 'react';

import { useSelector } from 'react-redux';
import { DataLine } from 'components';
import { RootState } from '../store';

function Home() {
  const dataLines = useSelector((state: RootState) => state.dataLines);

  if (dataLines.length === 0) {
    return <h1>No data to display</h1>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      {dataLines.map((line) => {
        return <DataLine dataLine={line} key={line.date} />;
      })}
    </div>
  );
}

export default Home;
