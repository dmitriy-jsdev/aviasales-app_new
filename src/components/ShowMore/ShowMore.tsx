import type { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showMoreTickets } from '../../store/actions/getTickets';
import styles from './ShowMore.module.scss';

export default function ShowMore(): ReactElement | null {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.tickets.loadingTickets);
  const checkboxes = useAppSelector((state) => state.checkboxes);
  const areAllCheckboxesFalse = Object.values(checkboxes).every(
    (value) => !value,
  );

  const handleShowMoreClick = () => {
    dispatch(showMoreTickets());
  };

  if (isLoading || areAllCheckboxesFalse) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.showMoreBtn}
      onClick={handleShowMoreClick}
    >
      Показать еще 5 билетов!
    </button>
  );
}
