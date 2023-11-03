import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './LeftBlock.module.css';
import { CardPreview } from '../cardPreview/CardPreview';
import { Product } from '../../types';
import Pagination from '../pagination/Pagination';

type LeftBlockProps = {
  showsData: Product[];
};
function LeftBlock({ showsData }: LeftBlockProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleClick() {
    if (pathname !== '/') navigate(-1);
  }

  const { showId } = useParams<'showId'>();

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <ul onClick={handleClick} className={showId ? styles.shade : ''}>
        {showsData.map((item) => {
          return <CardPreview showData={item} key={item.id} />;
        })}
      </ul>
      <Pagination total={showsData.length} />
    </div>
  );
}

export default LeftBlock;
