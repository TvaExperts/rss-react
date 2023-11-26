import React from 'react';
import { Header } from '../header/Header';
import ProductList from '../productList/ProductList';
import { ProductsApiResponse } from '../../services/api';

type MainContainerProps = {
  productsApiResponse: ProductsApiResponse;
  children?: React.ReactNode;
};

function MainContainer({ children, productsApiResponse }: MainContainerProps) {
  return (
    <>
      <Header />
      <main>
        <ProductList productsApiResponse={productsApiResponse} />
        {children}
      </main>
    </>
  );
}

MainContainer.defaultProps = {
  children: null,
};
export default MainContainer;
