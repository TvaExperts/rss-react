import { useNavigate, useParams } from 'react-router-dom';
import styles from './RightBlock.module.css';

export function RightBlock() {
  const { showId } = useParams<'showId'>();
  const navigate = useNavigate();

  function handleClose() {
    navigate(-1);
  }

  return (
    <div className={styles.rightBlock}>
      <p>{showId}</p>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
