import React from 'react';
import { Header } from '../header/Header';
import ProductList from '../productList/ProdustList';

type MainContainerProps = {
  children?: React.ReactNode;
};

function MainContainer({ children }: MainContainerProps) {
  return (
    <>
      <Header />
      <main>
        <ProductList />
        {children}
      </main>
    </>
  );
}

MainContainer.defaultProps = {
  children: null,
};
export default MainContainer;
