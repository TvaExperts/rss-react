import React, { ChangeEvent } from 'react';
import styles from './Pagination.module.css';
import { DEFAULT_LIMIT } from '../../constants/searchParams';
import { ActionTypes } from '../../reducers/appReducer';
import { useAppContext } from '../../hooks/useAppContext';

function Pagination() {
  const { state, dispatch } = useAppContext();
  const { total, limit, offset } = state;

  const currentPageNumber = Math.floor(offset / limit) + 1;
  const highestPageNumber = Math.ceil(total / limit);

  function handleGoToPage(pageNumber: number) {
    dispatch({
      type: ActionTypes.changeOffset,
      payload: (pageNumber - 1) * limit,
    });
  }

  function handleChangeCountOfItems(event: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: ActionTypes.changeLimit,
      payload: Number(event.target.value) || DEFAULT_LIMIT,
    });
  }

  return (
    <>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(1)}
          disabled={currentPageNumber <= 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(currentPageNumber - 1)}
          disabled={currentPageNumber <= 1}
        >
          &#60;
        </button>
        <p>{currentPageNumber}</p>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(currentPageNumber + 1)}
          disabled={currentPageNumber >= highestPageNumber}
        >
          &#62;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(highestPageNumber)}
          disabled={currentPageNumber >= highestPageNumber}
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
