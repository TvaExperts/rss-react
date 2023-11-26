import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import styles from './Pagination.module.css';
import { ROUTES } from '../../routes/routes';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '../../utils/searchParams';
import { DEFAULT_LIMIT } from '../../models/searchParameters';

type PaginationProps = {
  total: number;
};

function Pagination({ total }: PaginationProps) {
  const router = useRouter();
  const { limit, page, text } = getAppSearchParamsFromQuery(router.query);

  const highestPageNumber = Math.ceil(total / limit);

  function handleGoToPage(pageNumber: number) {
    const newSearchParams = createSearchParams({
      text,
      page: pageNumber,
      limit,
    });

    router.push(`${ROUTES.home}?${newSearchParams.toString()}`);
  }

  function handleChangeCountOfItems(event: ChangeEvent<HTMLSelectElement>) {
    const newSearchParams = createSearchParams({
      text,
      page: 1,
      limit: Number(event.target.value) || DEFAULT_LIMIT,
    });

    router.push(`${ROUTES.home}?${newSearchParams.toString()}`);
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
      } found. Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}

export default Pagination;
