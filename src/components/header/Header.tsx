import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';
import { Product } from '../../types';
import { getQueryFromLS, saveNewQueryInLS } from '../../utils/localStorage';
import { getProductsFromApi } from '../../services/api';
import { DEFAULT_LIMIT } from '../../constants/searchParams';
import { ROUTS } from '../../routs/routs';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Product search',
  BUTTON_FIND = 'Search',
  BUTTON_FIND_LOADING = 'Loading...',
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [queryParam, setQueryParam] = useState<string>(
    searchParams.get(SEARCH_PARAMETERS.QUERY) || getQueryFromLS()
  );

  useEffect(() => {
    if (queryParam !== '') {
      searchParams.set(SEARCH_PARAMETERS.QUERY, queryParam);
      navigate(`${ROUTS.HOME}?${searchParams.toString()}`);
    }
  }, [navigate, queryParam, searchParams]);

  const [inputText, setInputText] = useState<string>(queryParam);

  const limitValue =
    searchParams.get(SEARCH_PARAMETERS.LIMIT) || DEFAULT_LIMIT.toString();

  const offsetValue = searchParams.get(SEARCH_PARAMETERS.OFFSET) || '0';

  useEffect(() => {
    setIsLoading(true);
    saveNewQueryInLS(queryParam);
    getProductsFromApi(queryParam, limitValue, offsetValue).then(
      (productApiResponse) => {
        setTotalProducts(productApiResponse.total);
        setProducts(productApiResponse.products);
        setIsLoading(false);
      }
    );
  }, [
    queryParam,
    setIsLoading,
    limitValue,
    offsetValue,
    setTotalProducts,
    setProducts,
  ]);

  function handleClickFind() {
    const trimmedInputText = inputText.trim();
    setQueryParam(trimmedInputText);
    searchParams.set(SEARCH_PARAMETERS.QUERY, trimmedInputText);
    searchParams.set(SEARCH_PARAMETERS.OFFSET, '0');
    setSearchParams(searchParams);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleClickFind();
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
        onClick={handleClickFind}
        disabled={isLoading}
        className={styles.headerButton}
      >
        {isLoading ? TEXTS.BUTTON_FIND_LOADING : TEXTS.BUTTON_FIND}
      </button>
    </header>
  );
}
