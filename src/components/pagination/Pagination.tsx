import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pagination.module.css';
import { useAppSelector } from '../../hooks/redux';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';
import { ROUTS } from '../../routs/routs';

function Pagination() {
  const { total } = useAppSelector((state) => state.productsReducer);
  const { limit, page, text } = useAppSelector(
    (state) => state.searchParamsReducer
  );

  const navigate = useNavigate();

  const highestPageNumber = Math.ceil(total / limit);

  function handleGoToPage(pageNumber: number) {
    const searchParams = new URLSearchParams();
    searchParams.set(SEARCH_PARAMETERS.query, text);
    searchParams.set(SEARCH_PARAMETERS.page, pageNumber.toString(10));
    searchParams.set(SEARCH_PARAMETERS.limit, limit.toString(10));
    navigate(`${ROUTS.home}?${searchParams.toString()}`);
  }

  function handleChangeCountOfItems(event: ChangeEvent<HTMLSelectElement>) {
    const searchParams = new URLSearchParams();
    searchParams.set(SEARCH_PARAMETERS.query, text);
    searchParams.set(SEARCH_PARAMETERS.page, '1');
    searchParams.set(SEARCH_PARAMETERS.limit, event.target.value);
    navigate(`${ROUTS.home}?${searchParams.toString()}`);
  }

  return (
    <>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(1)}
          disabled={page <= 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(page - 1)}
          disabled={page <= 1}
        >
          &#60;
        </button>
        <p>{page}</p>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(page + 1)}
          disabled={page >= highestPageNumber}
          data-testid="next-page"
        >
          &#62;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(highestPageNumber)}
          disabled={page >= highestPageNumber}
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
      } found. ${text} Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}

export default Pagination;
