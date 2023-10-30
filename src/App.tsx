import { useState } from 'react';
import { Header } from './components/header/Header';
import { ShowData } from './types';
import { Main } from './components/main/Main';

export function App() {
  const [showsData, setShowsData] = useState<ShowData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header
        setShowsData={setShowsData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <Main data={showsData} isLoading={isLoading} />
    </>
  );
}
