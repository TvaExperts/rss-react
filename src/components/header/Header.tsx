import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAppSelector } from '../../hooks/redux';
import { ROUTES } from '../../routs/routes';
import { saveNewQueryInLS } from '../../utils/localStorage';
import { createSearchParams } from '../../utils/createSearchParams';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Product search',
  BUTTON_SEARCH = 'Search',
  BUTTON_SEARCH_LOADING = 'Loading...',
}

export function Header() {
  const { isLoading } = useAppSelector((state) => state.productsReducer);
  const { text, limit } = useAppSelector(
    (state) => state.appSearchParamsReducer
  );

  const [inputText, setInputText] = useState<string>(text);

  useEffect(() => {
    setInputText(text);
  }, [text]);

  const navigate = useNavigate();

  function handleClickSearch() {
    const trimmedText = inputText.trim();

    saveNewQueryInLS(trimmedText);

    const newSearchParams = createSearchParams({
      text: trimmedText,
      page: 1,
      limit,
    });
    navigate(`${ROUTES.home}?${newSearchParams.toString()}`);
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
