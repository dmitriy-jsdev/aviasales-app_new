import type { ReactElement } from 'react';
import Flight from './Flight/Flight';
import styles from './Ticket.module.scss';

type Segment = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
};

type Props = {
  price: number;
  carrier: string;
  segments: [Segment, Segment];
};

export default function Ticket({
  price,
  carrier,
  segments,
}: Props): ReactElement {
  const imgUrl = `https://pics.avs.io/99/36/${carrier}.png`;
  const formattedPrice = price.toLocaleString('ru-RU');

  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHeader}>
        <span className={styles.ticketPrice}>{`${formattedPrice} р`}</span>
        <img
          src={imgUrl}
          alt={`Логотип авиакомпании ${carrier}`}
          width={99}
          height={36}
          loading="lazy"
          decoding="async"
        />
      </div>

      <Flight
        from={segments[0].origin}
        to={segments[0].destination}
        date={segments[0].date}
        timeTravel={segments[0].duration}
        stops={segments[0].stops}
      />

      <Flight
        from={segments[1].origin}
        to={segments[1].destination}
        date={segments[1].date}
        timeTravel={segments[1].duration}
        stops={segments[1].stops}
      />
    </div>
  );
}
