import React, { ChangeEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Header.module.css';
import { useAppSelector } from '../../hooks/redux';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';
import { ROUTS } from '../../routs/routs';
import { saveNewQueryInLS } from '../../utils/localStorage';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Product search',
  BUTTON_SEARCH = 'Search',
  BUTTON_SEARCH_LOADING = 'Loading...',
}

export function Header() {
  const { isLoading } = useAppSelector((state) => state.productsReducer);
  const { text } = useAppSelector((state) => state.searchParamsReducer);

  const [inputText, setInputText] = useState<string>(text);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleClickSearch() {
    const trimmedText = inputText.trim();
    searchParams.set(SEARCH_PARAMETERS.query, trimmedText);
    searchParams.set(SEARCH_PARAMETERS.page, '1');
    saveNewQueryInLS(trimmedText);
    navigate(`${ROUTS.home}?${searchParams.toString()}`);
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
