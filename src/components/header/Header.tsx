import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';
import { getQueryFromLS, saveNewQueryInLS } from '../../utils/localStorage';
import { getProductsFromApi } from '../../services/api';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/searchParams';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';
import { AppContext } from '../../context/AppProvider';
import { ActionTypes } from '../../reducers/appReducer';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Product search',
  BUTTON_SEARCH = 'Search',
  BUTTON_SEARCH_LOADING = 'Loading...',
}

type HeaderProps = {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export function Header({ setIsLoading, isLoading }: HeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = useContext(AppContext);

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
      dispatch({ type: ActionTypes.setProducts, payload: productApiResponse });
      setIsLoading(false);
    });
  }, [queryParam, setIsLoading, limit, offset, dispatch]);

  function handleClickSearch() {
    const trimmedInputText = inputText.trim();
    setQueryParam(trimmedInputText);
    searchParams.set(SEARCH_PARAMETERS.query, trimmedInputText);
    searchParams.set(SEARCH_PARAMETERS.offset, DEFAULT_OFFSET.toString());
    dispatch({ type: ActionTypes.setQuery, payload: trimmedInputText });
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
