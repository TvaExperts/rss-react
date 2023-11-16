import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Header.module.css';
import { saveNewQueryInLS } from '../../utils/localStorage';
import { getProductsFromApi } from '../../services/api';
import { ActionTypes } from '../../reducers/appReducer';
import { useAppContext } from '../../hooks/useAppContext';

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
  const { state, dispatch } = useAppContext();
  const { query, limit, page } = state;
  const [inputText, setInputText] = useState<string>(query);

  useEffect(() => {
    if (!limit) return;
    setIsLoading(true);
    setInputText(query);
    saveNewQueryInLS(query);
    getProductsFromApi(query, limit, page).then((productApiResponse) => {
      dispatch({ type: ActionTypes.setProducts, payload: productApiResponse });
      setIsLoading(false);
    });
  }, [query, limit, page, dispatch, setIsLoading]);

  function handleClickSearch() {
    dispatch({ type: ActionTypes.setQuery, payload: inputText.trim() });
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
        data-testid="search-input"
      />

      <button
        type="button"
        onClick={handleClickSearch}
        disabled={isLoading}
        className={styles.searchButton}
        data-testid="search-button"
      >
        {isLoading ? TEXTS.BUTTON_SEARCH_LOADING : TEXTS.BUTTON_SEARCH}
      </button>
    </header>
  );
}
