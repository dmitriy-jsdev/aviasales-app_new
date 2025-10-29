import type { ReactElement } from 'react';
import { add, parseISO, format } from 'date-fns';
import styles from './Flight.module.scss';

type Props = {
  from: string;
  to: string;
  date: string;
  timeTravel: number;
  stops: string[];
};

export default function Flight({
  from,
  to,
  date,
  timeTravel,
  stops,
}: Props): ReactElement {
  const departure = format(parseISO(date), 'HH:mm');
  const arrival = format(add(parseISO(date), { minutes: timeTravel }), 'HH:mm');

  const stopsLabel: string = (() => {
    if (stops.length === 0) return 'без пересадок';
    const labels: { [k: number]: string; default: string } = {
      1: 'пересадка',
      default: 'пересадки',
    };
    return labels[stops.length] ?? labels.default;
  })();

  return (
    <div className={styles.flight}>
      <div className={styles.travelTime}>
        <h4>
          {from} – {to}
        </h4>
        <span>
          {departure} – {arrival}
        </span>
      </div>

      <div className={styles.routeLength}>
        <h4>В пути</h4>
        <span>
          {Math.floor(timeTravel / 60)}ч {timeTravel % 60}м
        </span>
      </div>

      <div className={styles.transfers}>
        <h4>
          {stops.length > 0 ? `${stops.length} ${stopsLabel}` : stopsLabel}
        </h4>
        <span className={styles.stopNames}>{stops.join(', ')}</span>
      </div>
    </div>
  );
}
