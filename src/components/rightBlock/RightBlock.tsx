import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import styles from './RightBlock.module.css';

export function RightBlock() {
  const { showId } = useParams<'showId'>();
  const navigate = useNavigate();

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseBlock(eventTarget?: EventTarget) {
    if (eventTarget && eventTarget !== overlayRef.current) return;
    navigate(-1);
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => handleCloseBlock(e.target)}
      ref={overlayRef}
      role="presentation"
    >
      <article className={styles.rightBlock}>
        <p>{showId}</p>
        <button type="button" onClick={() => handleCloseBlock()}>
          Close
        </button>
      </article>
    </div>
  );
}
