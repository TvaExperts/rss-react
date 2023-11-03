import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Header.module.css';
import { ShowData } from '../../types';
import { getQueryFromLS, saveNewQueryInLS } from '../../utils/localStorage';
import { getShowsDataFromApi } from '../../services/api';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Search by movies and TV shows',
  BUTTON_FIND = 'Search',
  BUTTON_FIND_LOADING = 'Loading...',
  NO_CHANGES = 'The request has not changed',
}

type HeaderProps = {
  setShowsData: (data: ShowData[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export function Header({ setShowsData, setIsLoading, isLoading }: HeaderProps) {
  const queryFromLS = getQueryFromLS();

  const [searchQuery, setSearchQuery] = useState<string>(queryFromLS);
  const [inputText, setInputText] = useState<string>(queryFromLS);

  const [hasWarningSameText, setHasWarningSameText] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    saveNewQueryInLS(searchQuery);
    getShowsDataFromApi(searchQuery).then((showsData) => {
      setShowsData(showsData);
      setIsLoading(false);
    });
  }, [searchQuery, setIsLoading, setShowsData]);

  function handleClickFind() {
    const trimmedInputText = inputText.trim();
    if (searchQuery === trimmedInputText) {
      setHasWarningSameText(true);
    } else {
      setSearchQuery(trimmedInputText);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleClickFind();
    }
  }

  function handleInputTextChange(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
    if (hasWarningSameText) setHasWarningSameText(false);
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

      <button type="button" onClick={handleClickFind} disabled={isLoading}>
        {isLoading ? TEXTS.BUTTON_FIND_LOADING : TEXTS.BUTTON_FIND}
      </button>

      {hasWarningSameText && <span>{TEXTS.NO_CHANGES}</span>}
    </header>
  );
}
