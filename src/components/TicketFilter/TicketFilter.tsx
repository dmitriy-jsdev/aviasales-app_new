import type { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { setFilterTickets } from '../../store/actions/getTickets';
import styles from './TicketFilter.module.scss';

const filterMap = {
  'Самый дешевый': 'cheapest',
  'Самый быстрый': 'fastest',
  Оптимальный: 'optimal',
} as const;

type FilterName = keyof typeof filterMap;

export default function TicketFilter(): ReactElement {
  const dispatch = useAppDispatch();
  const selectedFilter = useAppSelector((state) => state.tickets.filterTickets);

  const handleFilterClick = (filterName: FilterName) => {
    const filterKey = filterMap[filterName];
    dispatch(setFilterTickets(filterKey));
  };

  const getButtonClassName = (filterName: FilterName) =>
    `${styles.filterButton} ${
      selectedFilter === filterMap[filterName] ? styles.selected : ''
    }`;

  return (
    <nav className={styles.ticketFilter}>
      <ul className={styles.ticketFilterList}>
        {(Object.keys(filterMap) as FilterName[]).map((filterName) => (
          <li key={filterName} className={styles.ticketFilterItem}>
            <button
              type="button"
              className={getButtonClassName(filterName)}
              onClick={() => handleFilterClick(filterName)}
            >
              {filterName}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}