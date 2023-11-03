import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type PaginationProps = {
  total: number;
};

function Pagination({ total }: PaginationProps) {
  const [params] = useSearchParams();
  const limit = params.get('limit') || 99;
  const offset = params.get('offset') || 99;
  console.log(total);
  return (
    <div>
      <span>limit = {limit}</span>
      <span> offset = {offset}</span>
      {'   '}
      <Link to="/?limit=20&offset=0">1 </Link>{' '}
      <Link to="/?limit=20&offset=10">2 </Link>{' '}
      <Link to="/?limit=20&offset=20">3 </Link>
    </div>
  );
}

export default Pagination;
