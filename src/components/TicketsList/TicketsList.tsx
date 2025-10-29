import { useEffect, useMemo, type ReactElement } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  getTickets,
  startLoadingTickets,
  finishLoadingTickets,
} from '../../store/actions/getTickets';
import Ticket from '../Ticket/Ticket';
import checkmarkImg from '../../img/checkmark.png';
import styles from './TicketsList.module.scss';

type Segment = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
};

type TicketItem = {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
  departureTime?: string;
};

type FilterKey = 'cheapest' | 'fastest' | 'optimal';

export default function TicketsList(): ReactElement {
  const dispatch = useAppDispatch();

  const tickets = useAppSelector((state) => state.tickets.ticketsData);
  const visibleTickets = useAppSelector(
    (state) => state.tickets.visibleTickets,
  );
  const checkboxes = useAppSelector((state) => state.checkboxes);
  const filterTicketsRaw = useAppSelector(
    (state) => state.tickets.filterTickets,
  );
  const allTicketsLoaded = useAppSelector(
    (state) => state.tickets.allTicketsLoaded,
  );

  const areAllCheckboxesFalse = Object.values(checkboxes).every((v) => !v);

  useEffect(() => {
    dispatch(startLoadingTickets());
    dispatch(getTickets()).then(() => dispatch(finishLoadingTickets()));
  }, [dispatch]);

  const filteredTickets = useMemo(
    () =>
      tickets.filter((ticket) =>
        ticket.segments.every((segment) => {
          const stopCount = String(segment.stops.length);
          const checkboxesMap: Record<string, boolean> = {
            '0': checkboxes.noStops,
            '1': checkboxes.oneStop,
            '2': checkboxes.twoStops,
            '3': checkboxes.threeStops,
          };
          return checkboxesMap[stopCount] ?? false;
        }),
      ),
    [tickets, checkboxes],
  );

  const sortTickets = (
    ticketsToSort: TicketItem[],
    filterType: FilterKey,
  ): TicketItem[] => {
    switch (filterType) {
      case 'cheapest':
        return ticketsToSort.slice().sort((a, b) => a.price - b.price);
      case 'fastest':
        return ticketsToSort
          .slice()
          .sort(
            (a, b) =>
              a.segments.reduce((acc, s) => acc + s.duration, 0) -
              b.segments.reduce((acc, s) => acc + s.duration, 0),
          );
      case 'optimal':
        return ticketsToSort.slice().sort((a, b) => {
          const durA = a.segments.reduce((acc, s) => acc + s.duration, 0);
          const durB = b.segments.reduce((acc, s) => acc + s.duration, 0);
          const scoreA = a.price / durA;
          const scoreB = b.price / durB;
          return scoreA - scoreB;
        });
      default:
        return ticketsToSort;
    }
  };

  const activeFilter: FilterKey =
    filterTicketsRaw === '' ? 'cheapest' : filterTicketsRaw;

  const sortedAndFilteredTickets = useMemo(
    () => sortTickets(filteredTickets, activeFilter),
    [filteredTickets, activeFilter],
  );

  if (areAllCheckboxesFalse) {
    return (
      <p className={styles.noResults}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </p>
    );
  }

  return (
    <>
      {!allTicketsLoaded && (
        <>
          <div className={styles.loading} role="status" aria-live="polite">
            Загрузка всех билетов...
          </div>
          <div className={styles.loaderWrapper}>
            <BarLoader
              color="#2196f3"
              height={4}
              width="100%"
              aria-label="loading spinner"
              data-testid="loader"
            />
          </div>
        </>
      )}

      {allTicketsLoaded === 'download complete' && (
        <div className={styles.ticketsLoaded}>
          <img className={styles.imgCheck} src={checkmarkImg} alt="imgCheck" />
          <div className={styles.ticketsLoadedText}>Все билеты загружены</div>
        </div>
      )}

      {sortedAndFilteredTickets.slice(0, visibleTickets).map((ticket) => (
        <Ticket
          key={`${ticket.carrier}-${ticket.price}-${ticket.segments[0].date}-${ticket.segments[1].date}`}
          price={ticket.price}
          carrier={ticket.carrier}
          segments={ticket.segments}
        />
      ))}
    </>
  );
}
