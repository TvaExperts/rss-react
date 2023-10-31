import { useNavigate, useParams } from 'react-router-dom';
import styles from './CardShow.module.css';

export function CardShow() {
  const { showId } = useParams<'showId'>();
  const navigate = useNavigate();

  function handleClose() {
    navigate(-1);
  }

  return (
    <div className={styles.block}>
      <p>{showId}</p>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
