import React from 'react';
import { ShowData, TEXTS } from '../types';
import CardList from '../components/cardList/CardList';

type MainProps = {
  data: ShowData[];
  isLoading: boolean;
};

export function Home({ data, isLoading }: MainProps) {
  if (isLoading) {
    return TEXTS.MAIN_LOADING;
  }

  if (!data || !data.length) {
    return TEXTS.NOT_FOUND;
  }

  return <CardList data={data} />;
}
