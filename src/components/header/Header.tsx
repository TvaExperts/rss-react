import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';
import { Product } from '../../types';
import { getQueryFromLS, saveNewQueryInLS } from '../../utils/localStorage';
import { getProductsFromApi } from '../../services/api';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/searchParams';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Product search',
  BUTTON_SEARCH = 'Search',
  BUTTON_SEARCH_LOADING = 'Loading...',
}

type HeaderProps = {
  setProducts: (data: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTotalProducts: (totalProducts: number) => void;
  isLoading: boolean;
};

export function Header({
  setProducts,
  setIsLoading,
  isLoading,
  setTotalProducts,
}: HeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [queryParam, setQueryParam] = useState<string>(
    searchParams.get(SEARCH_PARAMETERS.query) || getQueryFromLS()
  );

  const limit =
    searchParams.get(SEARCH_PARAMETERS.limit) || DEFAULT_LIMIT.toString();

  const offset =
    searchParams.get(SEARCH_PARAMETERS.offset) || DEFAULT_OFFSET.toString();

  const [inputText, setInputText] = useState<string>(queryParam);

  useEffect(() => {
    if (queryParam !== '' && !searchParams.get(SEARCH_PARAMETERS.query)) {
      searchParams.set(SEARCH_PARAMETERS.query, queryParam);
      setSearchParams(searchParams);
    }
  }, [queryParam, searchParams, setSearchParams]);

  useEffect(() => {
    setIsLoading(true);
    saveNewQueryInLS(queryParam);
    getProductsFromApi(queryParam, limit, offset).then((productApiResponse) => {
      setTotalProducts(productApiResponse.total);
      setProducts(productApiResponse.products);
      setIsLoading(false);
    });
  }, [queryParam, setIsLoading, limit, offset, setTotalProducts, setProducts]);

  function handleClickSearch() {
    const trimmedInputText = inputText.trim();
    setQueryParam(trimmedInputText);
    searchParams.set(SEARCH_PARAMETERS.query, trimmedInputText);
    searchParams.set(SEARCH_PARAMETERS.offset, DEFAULT_OFFSET.toString());
    if (!searchParams.get(SEARCH_PARAMETERS.limit)) {
      searchParams.set(SEARCH_PARAMETERS.limit, limit);
    }
    setSearchParams(searchParams);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleClickSearch();
    }
  }

  function handleInputTextChange(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  return (
    <header className={styles.header}>
      <input
        type="text"
        className={styles.findInput}
        placeholder={TEXTS.INPUT_PLACEHOLDER}
        value={inputText}
        onChange={handleInputTextChange}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        onClick={handleClickSearch}
        disabled={isLoading}
        className={styles.searchButton}
      >
        {isLoading ? TEXTS.BUTTON_SEARCH_LOADING : TEXTS.BUTTON_SEARCH}
      </button>
    </header>
  );
}
