import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Product search',
  BUTTON_SEARCH = 'Search',
}

export function Header() {
  const router = useRouter();

  const [inputText, setInputText] = useState<string>('');

  function handleClickSearch() {
    console.log(router.asPath);
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
        className={styles.searchButton}
        data-testid="search-button"
      >
        {TEXTS.BUTTON_SEARCH}
      </button>
    </header>
  );
}
