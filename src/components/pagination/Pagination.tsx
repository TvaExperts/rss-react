import React, { ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';
import { DEFAULT_LIMIT } from '../../constants/searchParams';

type PaginationProps = {
  total: number;
};

function Pagination({ total }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(total);
  const limitParam = Number(searchParams.get('limit')) || DEFAULT_LIMIT;

  function handleGoToPage(pageNumber: number) {
    searchParams.set('offset', ((pageNumber - 1) * limitParam).toString());
    setSearchParams(searchParams);
  }

  function handleChangeCountOfItems(event: ChangeEvent<HTMLSelectElement>) {
    searchParams.set('limit', event.target.value);
    searchParams.set('offset', '0');
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <div className={styles.pagination}>
      <button type="button" onClick={() => handleGoToPage(1)}>
        1
      </button>
      <button type="button" onClick={() => handleGoToPage(2)}>
        2
      </button>
      <select onChange={handleChangeCountOfItems} defaultValue={limitParam}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

export default Pagination;
