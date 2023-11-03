import React from 'react';
import { ShowData } from '../types';
import CardList from '../components/cardList/CardList';
import Pagination from '../components/pagination/Pagination';

enum TEXTS {
  MAIN_LOADING = 'Loading data...',
  NOT_FOUND = 'Nothing was found, make another request',
}

type MainProps = {
  showsData: ShowData[];
  isLoading: boolean;
};

export function Home({ showsData, isLoading }: MainProps) {
  if (isLoading) {
    return TEXTS.MAIN_LOADING;
  }

  if (!showsData || !showsData.length) {
    return TEXTS.NOT_FOUND;
  }

  return (
    <div>
      <CardList data={showsData} />
      <Pagination total={showsData.length} />
    </div>
  );
}
