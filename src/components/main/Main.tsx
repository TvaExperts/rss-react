import React from 'react';
import { ShowData, TEXTS } from '../../types';
import { Card } from '../card/Card';

type MainProps = {
  data: ShowData[];
  isLoading: boolean;
};

export function Main({ data, isLoading }: MainProps) {
  if (isLoading) {
    return <main>{TEXTS.MAIN_LOADING}</main>;
  }

  if (!data.length) {
    return <main>{TEXTS.NOT_FOUND}</main>;
  }

  return (
    <main>
      {data.map((item) => {
        return <Card showData={item} key={item.id} />;
      })}
    </main>
  );
}
