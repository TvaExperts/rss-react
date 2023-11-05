import React, { ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import { DEFAULT_LIMIT } from '../../constants/searchParams';
import { SEARCH_PARAMETERS } from '../../routs/searchParameters';

type PaginationProps = {
  totalProducts: number;
};

function Pagination({ totalProducts }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const limitParam =
    Number(searchParams.get(SEARCH_PARAMETERS.LIMIT)) || DEFAULT_LIMIT;
  const offsetParam = Number(searchParams.get(SEARCH_PARAMETERS.OFFSET)) || 0;

  const currentPageNumber = Math.floor(offsetParam / limitParam) + 1;

  const highestPageNumber = Math.ceil(totalProducts / limitParam);

  function handleGoToPage(pageNumber: number) {
    searchParams.set(
      SEARCH_PARAMETERS.OFFSET,
      ((pageNumber - 1) * limitParam).toString()
    );
    if (!searchParams.get(SEARCH_PARAMETERS.LIMIT)) {
      searchParams.set(SEARCH_PARAMETERS.LIMIT, limitParam.toString());
    }
    setSearchParams(searchParams);
  }

  function handleChangeCountOfItems(event: ChangeEvent<HTMLSelectElement>) {
    searchParams.set(SEARCH_PARAMETERS.LIMIT, event.target.value);
    searchParams.set(SEARCH_PARAMETERS.OFFSET, '0');
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <>
      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => handleGoToPage(1)}
          disabled={currentPageNumber === 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          onClick={() => handleGoToPage(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
        >
          &#60;
        </button>
        <p>{currentPageNumber}</p>
        <button
          type="button"
          onClick={() => handleGoToPage(currentPageNumber + 1)}
          disabled={currentPageNumber === highestPageNumber}
        >
          &#62;
        </button>
        <button
          type="button"
          onClick={() => handleGoToPage(highestPageNumber)}
          disabled={currentPageNumber === highestPageNumber}
        >
          &#62;&#62;
        </button>
        <select onChange={handleChangeCountOfItems} defaultValue={limitParam}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div
        className={styles.summary}
      >{`${totalProducts} products found. Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}

export default Pagination;
