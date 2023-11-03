import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './CardList.module.css';
import { CardPreview } from '../cardPreview/CardPreview';
import { ShowData } from '../../types';

type CardListProps = {
  data: ShowData[];
};
function CardList({ data }: CardListProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleClick() {
    if (pathname !== '/') navigate(-1);
  }

  const { showId } = useParams<'showId'>();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <ul onClick={handleClick} className={showId ? styles.shade : ''}>
      {data.map((item) => {
        return <CardPreview showData={item} key={item.id} />;
      })}
    </ul>
  );
}

export default CardList;
