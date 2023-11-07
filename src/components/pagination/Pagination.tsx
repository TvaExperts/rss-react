import React, { ChangeEvent, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../constants/searchParams';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';
import { AppContext } from '../../context/AppProvider';

function Pagination() {
  const { total } = useContext(AppContext).state;
  const [searchParams, setSearchParams] = useSearchParams();

  const limit =
    Number(searchParams.get(SEARCH_PARAMETERS.limit)) || DEFAULT_LIMIT;
  const offset = Number(searchParams.get(SEARCH_PARAMETERS.offset)) || 0;

  const currentPageNumber = Math.floor(offset / limit) + 1;
  const highestPageNumber = Math.ceil(total / limit);

  function handleGoToPage(pageNumber: number) {
    searchParams.set(
      SEARCH_PARAMETERS.offset,
      ((pageNumber - 1) * limit).toString()
    );
    if (!searchParams.get(SEARCH_PARAMETERS.limit)) {
      searchParams.set(SEARCH_PARAMETERS.limit, limit.toString());
    }
    setSearchParams(searchParams);
  }

  function handleChangeCountOfItems(event: ChangeEvent<HTMLSelectElement>) {
    searchParams.set(SEARCH_PARAMETERS.limit, event.target.value);
    searchParams.set(SEARCH_PARAMETERS.offset, DEFAULT_OFFSET.toString());
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(1)}
          disabled={currentPageNumber === 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
        >
          &#60;
        </button>
        <p>{currentPageNumber}</p>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(currentPageNumber + 1)}
          disabled={currentPageNumber === highestPageNumber}
        >
          &#62;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(highestPageNumber)}
          disabled={currentPageNumber === highestPageNumber}
        >
          &#62;&#62;
        </button>
        <select onChange={handleChangeCountOfItems} defaultValue={limit}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className={styles.summary}>{`${total} product${
        total > 1 ? 's' : ''
      } found. Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}

export default Pagination;
